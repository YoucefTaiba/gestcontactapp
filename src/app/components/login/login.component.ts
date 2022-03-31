import { Component, OnInit, Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {
    form: FormGroup;
    router: Router; 
    showSpinner: boolean = false;
    constructor(private fb: FormBuilder,
        private authService: AuthService,
        router: Router) {
        this.router = router;
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    ngOnInit() {
    }

    login(): void {
        this.authService.signIn(this.form.value); 
        this.authService.isUserLoggedIn.next(true);
    }
} 
