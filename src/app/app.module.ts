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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import { GestContactInterceptor } from './gest-contact.interceptor';
import { AuthService } from './service/auth.service'; 
import { StyleManagerService } from "./service/style-manager.service"; 
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component'; 
import { AppMaterialModule } from "./app-material/app-material.module";
@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent, 
    ContactsComponent,
    AddContactComponent,
    PageNotFoundComponent,
    AddCompanyComponent,
    CompanyDetailsComponent,
    ContactDetailsComponent,
    CompanysComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule,  
    ReactiveFormsModule,
    FormsModule, 
    BrowserAnimationsModule, 
    LayoutModule,
    NgxPaginationModule, 
    AppMaterialModule,
  ],
  providers: [
    AuthService,StyleManagerService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: GestContactInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
