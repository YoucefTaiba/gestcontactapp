import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/service/company.service';
import { Company } from 'src/app/models/company.model';

import { Location } from '@angular/common';
@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  company!: Company;

  constructor(private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    this.getContact();
  }
  getContact(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.companyService.getCompany(id)
      .subscribe((company: Company) => this.company = company);
  }
  save(): void {
     this.companyService.updateCompany(this.company.id,this.company).subscribe((response:any) => {
         console.log(response)
     });
     this.router.navigate(['companys']);
  }
  goBack(): void {
    this.location.back();
  }

}
