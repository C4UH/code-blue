import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent {
  patientId: string;

  constructor(public router: Router) {
  }

  onPatientFind() {
    console.log(this.patientId);
    if (this.patientId) {
      this.router.navigate([`report`], {queryParams: {patientId: this.patientId}});
    } else {
      alert('Patient ID can not be empty.');
    }
  }
}
