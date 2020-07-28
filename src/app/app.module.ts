import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MyserviceService } from './myservice.service';

import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScannedDialogComponent } from './scanned-dialog/scanned-dialog.component';
import { NotTakingDialogComponent } from './not-taking-dialog/not-taking-dialog.component';
import { NotListedDialogComponent } from './not-listed-dialog/not-listed-dialog.component';
import { InvalidSabeelDialogComponent } from './invalid-sabeel-dialog/invalid-sabeel-dialog.component';
import { NotTakingListComponent } from './not-taking-list/not-taking-list.component';
import { NotScannedListComponent } from './not-scanned-list/not-scanned-list.component';
import { NotRegisteredDialogComponent } from './not-registered-dialog/not-registered-dialog.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReportsComponent } from './reports/reports.component';
import { TuksComponent } from './tuks/tuks.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ScannedDialogComponent,
    NotTakingDialogComponent,
    NotListedDialogComponent,
    InvalidSabeelDialogComponent,
    NotTakingListComponent,
    NotScannedListComponent,
    NotRegisteredDialogComponent,
    HeaderComponent,
    FooterComponent,
    ReportsComponent,
    TuksComponent,
  ],
  entryComponents: [
    NotListedDialogComponent,
    ScannedDialogComponent,
    NotTakingDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatInputModule,
    MatCardModule,
    NgbModule,
    MatButtonModule,
    ReactiveFormsModule,
    DataTablesModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    Ng2SearchPipeModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [MyserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
