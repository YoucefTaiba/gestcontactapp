import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/service/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact!: Contact;
  jobs!: Job[];
  constructor(private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    this.getContact();
  }
  getContact(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contactService.getContact(id)
      .subscribe((contact: Contact) => this.contact = contact);
    this.contactService.getContactJobs(id).subscribe((job: Job[]) => this.jobs = job);
  }
  save(): void {
    this.contactService.updateContact(this.contact?.id, this.contact);
    this.router.navigate(['companys']);
  }
  goBack(): void {
    this.location.back();
  }
}
