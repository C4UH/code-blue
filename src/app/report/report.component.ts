import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FhirService} from '../service/fhir.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  patientId: string;
  reportText: string;

  constructor(private route: ActivatedRoute, private fhirService: FhirService) {
  }

  ngOnInit() {
    this.patientId = this.route.snapshot.queryParamMap.get('patientId');

    console.log(`Loading PDMP report for patient ID: ${this.patientId}`);
    this.fhirService.getPDMP(this.patientId)
      .then(res => {
        this.reportText = res.reportText;
      });
  }

  /**
   *  Downloads the PDMP report into a PDF file
   */
  downloadPDF() {
    const doc = new jsPDF({
      orientation: 'portrait'
    });

    doc.setFontType('normal');
    doc.setFontSize('20');

    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    const title = `PDMP report for Patient ID: ${this.patientId}`;

    // Add a title page to the PDF.
    doc.text(title, pageWidth / 2, pageHeight / 2, 'center')

    // Render reportText as html. This means we can use HTML in the report instead of plain text.
    doc.fromHTML(this.reportText);
    doc.save(`${this.patientId}.pdf`);  // save the doc to a file
  }
}
