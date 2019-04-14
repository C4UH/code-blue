import {Injectable} from '@angular/core';
import { Medication, Medications } from '../report/Medication';

declare var FHIR: any;

@Injectable()
export class FhirService {
  FHIR_SERVER_URL = 'https://r2.smarthealthit.org'

  /**
   * Given a patient ID, return a promise which resolves to an object containing the PDMP report.
   * Sample Patient ID: 'smart-1137192'
   */
  getPDMP(pId: string): Promise<Medications> {

    const smart = new FHIR.client({
      serviceUrl: this.FHIR_SERVER_URL,
      patientId: pId
    });

    // fetchAll automatically pages for you
    return smart.patient.api.fetchAll({type: 'MedicationDispense', query: { $sort: [['whenhandedover', 'desc']] }})
      .then(response => {
        const meds = new Medications();
        if(typeof response == 'undefined') {
          meds.error = 'The FHIR server has returned an unexpected response. Please try again later or contact your IT administrator.';
        } else if(response.length == 0) {
          meds.error = `Patient ${pId} has no PDMP data.`;
        } else {
          meds.medications = this.parseReportData(response);
        }
        return meds;
      })
      .catch((e) => {
        console.error(e);
        const meds = new Medications();
        meds.error = 'Unable to retrieve PDMP data. Please try again later or contact your IT administrator.';
        return meds;
      });
  }

  parseReportData(data: any): Medication[] {
    const medications = data.map(entry => {
      let medication = new Medication();
      medication.name = entry.text.div.replace(/<\/?[^>]+(>|$)/g, "").trim(); // remove HTML
      medication.date = new Date(entry.whenHandedOver);
      medication.codes = [];
      entry.medicationCodeableConcept.coding.forEach(drugCode => {
        if (drugCode.system == 'http://www.nlm.nih.gov/research/umls/rxnorm') {
          medication.codes.push(drugCode.code);
        }
      });

      return medication;
    });
    return medications;
  }
}

