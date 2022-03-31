import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { Company } from 'src/app/models/company.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
    selector: 'app-companys',
    templateUrl: './companys.component.html',
    styleUrls: ['./companys.component.css']
})
export class CompanysComponent implements OnInit {
    companys: Company[] = [];
    currentCompany!: Company;
    currentIndex = -1;
    name = '';
    page = 1;
    count = 0;
    pageSize = 3;
    pageSizes = [3, 6, 9];
    isManager = false;
    isUser = false;
    constructor(private companyService: CompanyService, private authService: AuthService) {
    }
    ngOnInit(): void {
        if (this.authService.isLoggedIn) {
            const roles = this.authService.getRoles;
            this.isManager = roles.includes('ROLE_MANAGER');
            this.isUser = roles.includes('ROLE_USER');
        }
        this.getCompanys();
    }
    handlePageChange(event: number): void {
        this.page = event;
        this.getCompanys();
    }
    handlePageSizeChange(event: any): void {
        this.pageSize = event.target.value;
        this.page = 1;
        this.getCompanys();
    }
    searchCompany(): void {
        this.page = 1;
        this.getCompanys();
    }
    getCompanys() {

        this.companyService.getCompanys(this.name, this.page - 1, this.pageSize)
            .subscribe(
                (response: { companys: any; currentPage: number; totalItems: number; totalPages: number }) => {
                    // const { companys, totalItems } = response;
                    this.companys = response.companys;
                    this.count = response.totalItems; 
                },
                (error: any) => {
                    console.log(error);
                });
    }
    deleteCompany(company: Company) {
        var index = this.companys.map(x => { return x.nom }).indexOf(company.nom);
        if (window.confirm('Are sure you want to delete this company  ?' + company.nom)) {
            return this.companyService.deleteCompany(company.id).subscribe(() => {
                  this.companys.splice(index, 1);
            });
        }else{
            return false;
        }
    }
}
