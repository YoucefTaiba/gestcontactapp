import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
} )
export class AppComponent implements OnInit {
    isLoggedIn: boolean = false;
    constructor(
        public authService: AuthService ) {
    }
    ngOnInit() {
        this.isLoggedIn = this.authService.isLoggedIn();
    }

    logout(): void {
        this.authService.doLogout(); 
        window.location.reload();
    }
}
