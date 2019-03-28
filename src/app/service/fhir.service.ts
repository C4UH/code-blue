import {Injectable} from '@angular/core';

declare var FHIR: any;

@Injectable()
export class FhirService {
  FHIR_SERVER_URL = 'https://r2.smarthealthit.org'

  /**
   * Given a patient ID, return a promise which resolves to an object containing the PDMP report.
   * Sample Patient ID: 'smart-1137192'
   */
  getPDMP(pId: string): Promise<any> {

    const smart = new FHIR.client({
      serviceUrl: this.FHIR_SERVER_URL,
      patientId: pId
    });

    return smart.patient.api.search({type: 'MedicationDispense'})
      .then(response => {
        console.log(JSON.stringify(response, null, 2))
        if (response.status !== 'success') {
          return {reportText: 'The FHIR server has returned an unsuccessful status code. Please check your request and try again.'};
        }

        const reportString = this.parseReportData(response);
        return {reportText: reportString};
      })
      .catch(() => {
        return {reportText: 'Unable to retrieve PDMP data. Please try again later or contact your IT administrator.'};
      });
  }

  parseReportData(reportData: any): string {
    let reportString = '';
    reportData.data.entry.forEach(entry => {
      reportString += entry.resource.text.div;
      entry.resource.medicationCodeableConcept.coding.forEach(drugCode => {
        if (drugCode.system == 'http://www.nlm.nih.gov/research/umls/rxnorm') {
          reportString += `<div>RxNorm code: ${drugCode.code}</div>`;
        }
      });
      reportString += `<div>Handed over date: ${entry.resource.whenHandedOver}</div>`;
      reportString += '<br>';
    });
    return reportString;
  }
}

