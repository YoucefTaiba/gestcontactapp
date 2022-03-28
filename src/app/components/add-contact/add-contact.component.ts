import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component( {
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.css']
} )
export class AddContactComponent implements OnInit {


    studentForm: FormGroup;
    constructor(
        public fb: FormBuilder
    ) {
        this.studentForm = this.fb.group( {
            firstName: ['', [Validators.required, Validators.minLength( 2 )]],
            lastName: [''],
            email: [
                '',
                [
                    Validators.required,
                    Validators.pattern( '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$' ),
                ],
            ],
            mobileNumber: ['', [Validators.required, Validators.pattern( '^[0-9]+$' )]],
        } );
    }
    ngOnInit() {
        //    this.crudApi.GetStudentsList();
        this.studenForm();
    }
    studenForm() {
        this.studentForm = this.fb.group( {
            firstName: ['', [Validators.required, Validators.minLength( 2 )]],
            lastName: [''],
            email: [
                '',
                [
                    Validators.required,
                    Validators.pattern( '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$' ),
                ],
            ],
            mobileNumber: ['', [Validators.required, Validators.pattern( '^[0-9]+$' )]],
        } );
    }
    get firstName() {
        return this.studentForm.get( 'firstName' );
    }
    get lastName() {
        return this.studentForm.get( 'lastName' );
    }
    get email() {
        return this.studentForm.get( 'email' );
    }
    get mobileNumber() {
        return this.studentForm.get( 'mobileNumber' );
    }
    ResetForm() {
        this.studentForm.reset();
    }
    submitStudentData() {
        //    this.crudApi.AddStudent(this.studentForm.value);
        //    this.toastr.success(
        //      this.studentForm.controls['firstName'].value + ' successfully added!'
        //    );
        this.ResetForm();
    }
}
