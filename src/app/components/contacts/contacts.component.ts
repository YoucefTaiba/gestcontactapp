import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/service/contact.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  dtOptions: DataTables.Settings = {};

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts() ;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange: false, 
      ordering: false,
      searching: false,
      info: false,
    };
  }
  public getContacts(): void {
    this.contactService.getContacts().subscribe(
      (response: Contact[]) => {
        this.contacts = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );

  }
}
