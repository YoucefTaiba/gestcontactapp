import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Company } from '../models/company.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiServiceUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getCompanys(name: string = '',
    page = 0, size = 3): any {
    return this.http.get(`${this.apiServiceUrl}/company/all`, {
      params: new HttpParams()
        .set('name', name)
        .set('page', page.toString())
        .set('size', size.toString())
    });
  }
  public getCompany(id: string | number | null): Observable<Company> {
    return this.http.get<Company>(`${this.apiServiceUrl}/company/find/` + id).pipe(retry(1), catchError(this.errorHandl));;
  }
  public addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.apiServiceUrl}/company/add`, company);
  }
  public updateCompany(id: string | number | null, company: Company)  {
    return this.http.put (`${this.apiServiceUrl}/company/update/` + id, company).pipe(retry(1), catchError(this.errorHandl));;
  }
  public deleteCompany(companyId: number) {
    return this.http.delete (`${this.apiServiceUrl}/company/delete/${companyId}`);
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
