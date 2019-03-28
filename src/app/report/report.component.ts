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
  // split the report into 220mm length lines of splitTextToSize
  // splitText is an array of these lines of text
    var splitText = doc.splitTextToSize(this.reportText,220);
    var pageHeight = doc.internal.pageSize.height;
    doc.setFontType("normal");
    doc.setFontSize("12");
    var y = 10;   // set the top margin in mm
    // iterate over the splitText array writing a line of text into the doc
    for (var i = 0; i < splitText.length; i++) {
        if (y > 280) {  // y is > 280mm down on the page, add a new page
            y = 10;
            doc.addPage();
        }
        doc.text(15, y, splitText[i]);  // write line of text into doc
        y = y + 7;  // move the y pointer to the next line
    }

    doc.save('Test.pdf');  // save the doc to a file
  }
}
