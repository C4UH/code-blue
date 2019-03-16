import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FindComponent} from './find/find.component';
import {ReportComponent} from './report/report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'find',
    pathMatch: 'full'
  },
  {
    path: 'find',
    component: FindComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
