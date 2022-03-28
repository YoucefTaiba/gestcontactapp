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

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts() ;

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
  deleteContact(contact:any) {
      if (window.confirm('Are sure you want to delete this Contact ?')) { 
//        this.crudApi.DeleteStudent(student.$key)
//        this.toastr.success(student.firstName + ' successfully deleted!');
      }
    }
}
