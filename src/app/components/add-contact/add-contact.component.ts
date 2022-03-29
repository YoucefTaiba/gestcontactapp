import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/service/company.service';

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
    contactForm: FormGroup ;
    constructor(
        private companyService: CompanyService,
        public fb: FormBuilder
    ) {
        this.contactForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
            adresse: ['']
        });
    }
    ngOnInit() { 
        //  this.contacteForm();
    }
    contacteForm() {
        this.contactForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
            adresse: ['']
        });
    }
    get getFirstName() {
        return this.contactForm.get('firstname');
    }
    get getLastName() {
        return this.contactForm.get('lastname');
    }
    get getAdresse() {
        return this.contactForm.get('adresse');
    }
    get getTva() {
        return this.contactForm.get('tva');
    }

    ResetForm() {
        this.contactForm.reset();
    }
    submitContactData() {
        this.companyService.addCompany(this.contactForm.value);
        // this. .success(
        //     this.contactForm.controls['firstName'].value + ' successfully added!'
        // );
        this.ResetForm();
    }
}
