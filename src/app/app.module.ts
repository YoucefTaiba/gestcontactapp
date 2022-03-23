import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { CompanysComponent } from './components/companys/companys.component';
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RegistrationComponent } from './components/registration/registration.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeComponent } from './components/home/home.component';
import { GestContactInterceptor } from './gest-contact.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ContactsComponent,
    AddContactComponent,
    PageNotFoundComponent,
    AddCompanyComponent,
    CompanyDetailsComponent,
    ContactDetailsComponent,
    CompanysComponent,
    HomeComponent
  ],
  imports: [
    MatCardModule, MatInputModule,
    MatButtonModule,
    BrowserModule, HttpClientModule,
    AppRoutingModule, DataTablesModule, ReactiveFormsModule,
    FormsModule, BrowserAnimationsModule, LayoutModule,
    MatToolbarModule, MatSidenavModule,
    MatIconModule, MatListModule, MatProgressSpinnerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: GestContactInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
