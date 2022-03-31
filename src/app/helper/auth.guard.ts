import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,  Router } from '@angular/router';
//import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable( {
    providedIn: 'root'
} )
export class AuthGuard implements CanActivate {
    constructor
        ( private router: Router, private authService: AuthService ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): any {  
        if ( !this.authService.isLoggedIn) {
            this.router.navigate( ['/login'] ); 
            return false;
        }  else{ 
            return true;
        }
    }


}
