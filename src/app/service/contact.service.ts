import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Contact } from '../models/contact.model';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiServiceUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {

  }
  public getContacts(name: string = '',
    page = 0, size = 3): any {
    return this.http.get(`${this.apiServiceUrl}/contact/all`, {
      params: new HttpParams()
        .set('name', name)
        .set('page', page.toString())
        .set('size', size.toString())
    });
  }
  public getContact(contactId: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiServiceUrl}/contact/find/${contactId}`);
  }

  public addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiServiceUrl}/contact/add`, contact).pipe(retry(1), catchError(this.errorHandl));
  }
  public updateContact(id: number, contact: Contact) {
    return this.http.put<Contact>(`${this.apiServiceUrl}/contact/update/` + id, contact).pipe(retry(1), catchError(this.errorHandl));
  }
  public deleteContact(contactId: number) {
    return this.http.delete(`${this.apiServiceUrl}/contact/delete/${contactId}`);
  }
  // Error handling
  errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => { return errorMessage; });
  }
}