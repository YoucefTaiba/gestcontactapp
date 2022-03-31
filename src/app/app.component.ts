import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service'; 


@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
} )
export class AppComponent implements OnInit {
    title:string="gestcontactapp";
    isLoggedIn:boolean=false;
    constructor(
        public authService: AuthService ) {
            this.authService.isUserLoggedIn.subscribe( (value: boolean) => {
            this.isLoggedIn  = value;
        });
    }
    ngOnInit() { 
    } 
}
