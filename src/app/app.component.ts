import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { ContacteService } from './contacte.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'gestcontactapp';
  public contacts: Contact[];
  // public contacts: Observable<Contact[]> ;
  constructor(private contactService: ContacteService) {
    this.contacts=new Array<Contact>();
  }
  ngOnInit() {
    this.getContactes();
  }
  public getContactes(): void {
    this.contactService.getContacts().subscribe(
      (response: Contact[]) => {
        this.contacts=response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );

  }
}
