import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ContactService } from 'src/app/service/contact.service';

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
    contactForm!: FormGroup;
    constructor(
        private contactService: ContactService,
        private authService: AuthService,
        private router: Router,
        public fb: FormBuilder
    ) {
        if (!this.authService.isLoggedIn) {
            this.router.navigate(['login']);
        }
        this.contactForm = this.fb.group({
            nom: ['', [Validators.required, Validators.minLength(3)]],
            prenom: ['', [Validators.required, Validators.minLength(3)]],
            adresse: ['']
        });
    }
    ngOnInit() {
        //  this.contacteForm();
    }
    contacteForm() {
        this.contactForm = this.fb.group({
            nom: ['', [Validators.required, Validators.minLength(3)]],
            prenom: ['', [Validators.required, Validators.minLength(3)]],
            adresse: ['']
        });
    }
    goBack() {
        this.router.navigate(['contacts']);
    }
    ResetForm() {
        this.contactForm.reset();
    }
    submitContactData() {
        this.contactService.addContact(this.contactForm.value).subscribe((response: any) => {
            console.log(response)
        });
        this.router.navigate(['contacts']);;
        this.ResetForm();
    }
}
