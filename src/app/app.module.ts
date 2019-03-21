import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';

// Components
import {AppComponent} from './app.component';
import {ReportComponent} from './report/report.component';
import {FindComponent} from './find/find.component';

// Services
import {FhirService} from './service/fhir.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule, MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    FindComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [FhirService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
