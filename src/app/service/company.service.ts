import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiServiceUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  public getCompanys(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiServiceUrl}/company/all`);
  }

  public addCompany(contact: Company): Observable<Company[]> {
    return this.http.post<Company[]>(`${this.apiServiceUrl}/company/add`, contact);
  }
  public updateCompany(contact: Company): Observable<Company[]> {
    return this.http.put<Company[]>(`${this.apiServiceUrl}/company/update`, contact);
  }
  public deleteCompany(contactId: number): Observable<Company[]> {
    return this.http.delete<Company[]>(`${this.apiServiceUrl}/company/delete/${contactId}`);
  }
}
