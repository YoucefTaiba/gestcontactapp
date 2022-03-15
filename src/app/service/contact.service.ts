import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiServiceUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {

  }
  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiServiceUrl}/contact/all`);
  }
   public getContact(contactId: number): Observable<Contact > {
    return this.http.get<Contact >(`${this.apiServiceUrl}/contact/${contactId}`);
  }

  public addContact(contact: Contact): Observable<Contact > {
    return this.http.post<Contact>(`${this.apiServiceUrl}/contact/add`, contact);
  }
  public updateContact(contact: Contact): Observable<Contact > {
    return this.http.put<Contact >(`${this.apiServiceUrl}/contact/update`, contact);
  }
  public deleteContact(contactId: number): Observable<Contact[]> {
    return this.http.delete<Contact[]>(`${this.apiServiceUrl}/contact/delete/${contactId}`);
  }
}