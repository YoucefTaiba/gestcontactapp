import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Company } from 'src/app/models/company.model';
import { Job } from 'src/app/models/job.model';
import { ContactService } from 'src/app/service/contact.service';
import { CompanyService } from 'src/app/service/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component( {
    selector: 'app-contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.css']
} )
export class ContactDetailsComponent implements OnInit {
    contact!: Contact;
    jobs!:Job[];
    companys!:Company[];
    jobForm!: FormGroup;
    constructor( private contactService: ContactService,
        private companyService: CompanyService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location ,
        public fb: FormBuilder) { 
        this.jobForm = this.fb.group({
            titre: ['', [Validators.required, Validators.minLength(3)]],
            company: ['', [Validators.required]],
            freelance: ['', [Validators.required]],
            tva:['']
        });
    }

    ngOnInit(): void {
        this.getContact();
    }
    getContact(): void {
        const id = Number( this.route.snapshot.paramMap.get( 'id' ) );
        this.contactService.getContact( id )
            .subscribe(( contact: Contact ) => {
                this.contact = contact;
                this.jobs = contact.jobs
            } );
        this.companyService.getCompanys( '', 0,100 ).subscribe(( res: { companys: any; currentPage: number; totalItems: number; totalPages: number })  => {
            this.companys = res.companys;
        } );
    }
    save(): void {
        this.contactService.updateContact( this.contact ?.id, this.contact );
        this.router.navigate( ['contacts'] );
    }
    deleteJob( index: number, job: Job ) {
        if ( confirm( "Are you sure to delete?" ) ) {
            this.contactService.deleteJob( this.contact.id, job.id ).subscribe(() => {
                this.jobs.splice( index, 1 );
            } );
        }
    }
    goBack(): void {
        this.location.back();
    }
}
