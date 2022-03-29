import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})

export class AddCompanyComponent implements OnInit {   
    public companyForm: FormGroup;
    constructor(
        private companyService: CompanyService,
        private router: Router,
        public fb: FormBuilder
    ) {
        this.companyForm = this.fb.group({
            nom: ['', [Validators.required, Validators.minLength(3)]],
            adresse: [''],
            tva: ['', [Validators.pattern('^[0-9]+$')]],
        });
    }
    ngOnInit() {
        //    this.crudApi.GetStudentsList();
        this.companyeForm();
    }
    companyeForm() {
        this.companyForm = this.fb.group({
            nom: ['', [Validators.required, Validators.minLength(3)]],
            adresse: [''],
            tva: ['', [Validators.pattern('^[0-9]+$')]],
        });
    }
    get getName() {
        return this.companyForm.get('name');
    }
    get getAdresse() {
        return this.companyForm.get('adresse');
    }
    get getTva() {
        return this.companyForm.get('tva');
    }

    ResetForm() {
        this.companyForm.reset();
    }
    submitCompanyData() {
        this.companyService.addCompany(this.companyForm.value).subscribe((response:any) => {
            console.log(response)
        });
        this.router.navigate(['companys']);
        this.ResetForm();
    }

}
