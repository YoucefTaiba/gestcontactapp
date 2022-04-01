import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Company } from 'src/app/models/company.model';
import { Job } from 'src/app/models/job.model';
import { ContactService } from 'src/app/service/contact.service';
import { CompanyService } from 'src/app/service/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
    modalRef!: BsModalRef;
    contact!: Contact;
    jobs!: Job[];
    closeModal!: string;

    companys!: Company[];
    jobForm!: FormGroup;

    constructor(private modalService: BsModalService,
        private contactService: ContactService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private companyService: CompanyService,
        public fb: FormBuilder) {
        this.jobForm = this.fb.group({
            titre: ['', [Validators.required, Validators.minLength(3)]],
            company: ['', [Validators.required]],
            freelance: ['', [Validators.required]],
            tva: ['']
        });
        this.companyService.getCompanys('', 0, 100).subscribe((res: { companys: any; currentPage: number; totalItems: number; totalPages: number }) => {
            this.companys = res.companys;
        });
    }

    ngOnInit(): void {
        this.getContact();
    }
    getContact(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.contactService.getContact(id)
            .subscribe((contact: Contact) => {
                this.contact = contact;
                this.jobs = contact.jobs
            });

    }
    save(): void {
        this.contactService.updateContact(this.contact?.id, this.contact);
        this.router.navigate(['contacts']);
    }
    deleteJob(index: number, job: Job) {
        if (confirm("Are you sure to delete?")) {
            this.contactService.deleteJob(this.contact.id, job.id).subscribe(() => {
                this.jobs.splice(index, 1);
            });
        }
    }
    goBack(): void {
        this.location.back();
    }
    openModal(modalTemplate: TemplateRef<any>) {
        this.modalRef = this.modalService.show(modalTemplate,
            {
                class: 'modal-dialogue-centered modal-md',
                backdrop: 'static',
                keyboard: true
            }
        );
    }
    closeModle(id: number) {
        if (id === 2) {
            if (!this.jobForm.valid)
                return;
            this.contactService.addJob(this.contact.id, this.jobForm.value).subscribe((res: Job) => {
                this.jobs.push(res);
            });

            this.modalRef.hide();
        } else {
            this.modalRef.hide();
        }

    }


}
