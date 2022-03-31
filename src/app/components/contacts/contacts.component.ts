import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/service/contact.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  currentIndex = -1;
  name = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  isManager = false;
  isUser = false;
  constructor(private contactService: ContactService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
            const roles = this.authService.getRoles;
            this.isManager = roles.includes('ROLE_MANAGER');
            this.isUser = roles.includes('ROLE_USER');
        } 
    this.getContacts();

  }
  handlePageChange(event: number): void {
    this.page = event;
    this.getContacts();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getContacts();
  }
  searchContact(): void {
    this.page = 1;
    this.getContacts();
  }
  getContacts() {
    this.contactService.getContacts(this.name, this.page - 1, this.pageSize)
            .subscribe(
                (response: { contacts: any; currentPage: number; totalItems: number; totalPages: number }) => {
                    // const { companys, totalItems } = response;
                    this.contacts = response.contacts;
                    this.count = response.totalItems;
                    console.log(response);
                },
                (error: any) => {
                    console.log(error);
                });

  }
  deleteContact(contact: Contact) {
    var index = this.contacts.map(x => { return x.nom }).indexOf(contact.nom);
    if (window.confirm('Are sure you want to delete this company  ?' + contact.nom)) {
      return this.contactService.deleteContact(contact.id).subscribe(() => {
        this.contacts.splice(index, 1);
      });
    } else {
      return null;
    }
  }
}
