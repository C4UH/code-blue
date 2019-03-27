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
    // TODO: Download PDMP report to PDF
    const doc = new jsPDF({
  orientation: 'portrait'
});
    var splitText = doc.splitTextToSize(this.reportText,220);
    var pageHeight = doc.internal.pageSize.height;
    doc.setFontType("normal");
    doc.setFontSize("12");
    var y = 7;
    for (var i = 0; i < splitText.length; i++) {
        if (y > 280) {
            y = 10;
            doc.addPage();
        }
        doc.text(15, y, splitText[i]);
        y = y + 7;
    }
    //doc.text(splitText, 10, 10);

    doc.save('Test.pdf');
  }
}
