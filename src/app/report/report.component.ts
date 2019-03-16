import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FhirService} from '../service/fhir.service';

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
  }
}
