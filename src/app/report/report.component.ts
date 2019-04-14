import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FhirService} from '../service/fhir.service';
import * as jsPDF from 'jspdf';
import { Medications } from './Medication';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  patientId: string;
  meds: Medications;
  originalMeds: Medications;

  constructor(private route: ActivatedRoute, private fhirService: FhirService) {
  }

  ngOnInit() {
    this.patientId = this.route.snapshot.queryParamMap.get('patientId');

    console.log(`Loading PDMP report for patient ID: ${this.patientId}`);
    this.fhirService.getPDMP(this.patientId)
      .then(res => {
        this.meds = Object.create(res); // prevent pass by reference
        this.originalMeds = Object.create(res); // prevent pass by reference
        // trigger toggle by default
        this.onYearToggle({checked: true});
      });
  }

  onYearToggle(event) {
    const { medications } = this.meds;
    if(medications.length > 0) {
      if(event.checked) {
        const startDate = medications[0].date;
        const oneYearAgo = new Date(startDate.getFullYear() - 1, startDate.getMonth(), startDate.getDay());
        const oneYearMeds = medications.filter(med => med.date >= oneYearAgo);
        this.meds.medications = oneYearMeds;
      } else {
        this.meds.medications = this.originalMeds.medications;
      }
    }
  }

  /**
   *  Downloads the PDMP report into a PDF file
   */
  downloadPDF() {
    if(this.meds.error) {
      alert('Nothing to print');
    } else {
      const pdf = this.preparePDF();
      pdf.save(`pdmp-report_${this.patientId}.pdf`);
    }
  }

  preparePDF(): jsPDF {
    const { medications } = this.meds;
    const pdf = new jsPDF({
      orientation: 'portrait'
    });

    pdf.setFontType('normal');
    pdf.setFontSize('20');

    const pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();
    const title = `PDMP report for Patient ID: ${this.patientId}`;

    // Add a title page to the PDF.
    pdf.text(title, pageWidth / 2, pageHeight / 2, 'center')
    
    pdf.addPage();
    pdf.setFontSize('12');
    
    // Add text
    const startOfPage = 15;
    const leftMargin = 15;
    const pageLength = 280;
    let currentPos = startOfPage;
    for(let i = 0; i < medications.length; i++) {
      // add new page if we're going over soon
      if(currentPos > pageLength) {
        pdf.addPage();
        currentPos = startOfPage;
      }
      // otherwise add text
      pdf.text(medications[i].name, leftMargin, currentPos);
      currentPos += 5;
      for(let j = 0; j < medications[i].codes.length; j++) {
        pdf.text('RxNorm code: ' + medications[i].codes, leftMargin, currentPos);
        currentPos += 5;
      }
      pdf.text('Handed over date: ' + medications[i].date, leftMargin, currentPos);
      currentPos += 5;
      pdf.line(0, currentPos, 210, currentPos)
      currentPos += 7;
    }

    return pdf;
  }

}
