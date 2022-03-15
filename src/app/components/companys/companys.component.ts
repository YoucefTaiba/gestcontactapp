import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-companys',
  templateUrl: './companys.component.html',
  styleUrls: ['./companys.component.css']
})
export class CompanysComponent implements OnInit {
  companys: Company[] = []
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompanys();
  }
  public getCompanys(): void {
    this.companyService.getCompanys()
      .subscribe
      (
        (response: Company[]) => {
          this.companys = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        });
  }

}
