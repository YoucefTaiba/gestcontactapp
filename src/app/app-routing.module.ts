import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { CompanysComponent } from './components/companys/companys.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component:AppComponent }, 
  { path: 'registre', component: RegistrationComponent},
  { path: 'home', component: HomeComponent},
  { path: 'contacts', component: ContactsComponent },
  { path: 'contact/:id', component: ContactDetailsComponent },
  { path: 'add-contact', component: AddContactComponent },
  { path: 'detail-contact', component: ContactsComponent },
  { path: 'companys', component: CompanysComponent },
  { path: 'company/:id', component: CompanyDetailsComponent },
  { path: 'add-company', component: AddCompanyComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
