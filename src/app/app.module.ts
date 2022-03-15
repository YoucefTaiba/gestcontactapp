import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component'; 
import { HttpClientModule } from '@angular/common/http';
import { ContactsComponent } from './components/contacts/contacts.component'; 
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { CompanysComponent } from './components/companys/companys.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataTablesModule } from "angular-datatables";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent, 
    AddContactComponent,
    PageNotFoundComponent,
    AddCompanyComponent,
    CompanyDetailsComponent,
    ContactDetailsComponent,
    CompanysComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,HttpClientModule, AppRoutingModule,DataTablesModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
