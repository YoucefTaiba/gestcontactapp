import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';


@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
} )
export class AppComponent implements OnInit {
    isLoggedIn: boolean = false;
    showManager = false;
    showUser = false;
    constructor(
        public authService: AuthService,
        private router: Router ) {
        this.router.events.forEach(( e: Event ) => {
            if ( e instanceof NavigationEnd ) {
                this.isLoggedIn = this.authService.isLoggedIn;
            }
            // NavigationEnd
            // NavigationCancel
            // NavigationError
            // RoutesRecognized

        } );
    }
    ngOnInit() {
        this.isLoggedIn = !!this.authService.getToken;
        if ( this.isLoggedIn ) {
            const roles = this.authService.getRoles;
            this.showManager = roles.includes( 'ROLE_MANGER' );
            this.showUser = roles.includes( 'ROLE_USER' );
        }

    }

    logout(): void {
        this.authService.doLogout();
    }
}
