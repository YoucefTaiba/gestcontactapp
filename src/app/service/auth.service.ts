
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
@Injectable( {
    providedIn: 'root',
} )
export class AuthService {
    endpoint: string = environment.apiBaseUrl;
    headers = new HttpHeaders().set( 'Content-Type', 'application/json' );
    currentUser = {};
    constructor( private http: HttpClient, public router: Router ) { } 
    //registre
    registre( user: User ): Observable<any> {
        let api = `${this.endpoint}/user/add`;
        return this.http.post( api, user ).pipe( catchError( this.handleError ) );
    }
    // Sign-in
    signIn( user: User ) {
        return this.http
            .post<any>( `${this.endpoint}/login`, user )
            .subscribe(( res: any ) => {
                localStorage.setItem( 'access_token', res.access_token );
                localStorage.setItem( 'refresh_token', res.refresh_token );
                this.router.navigate( ['home'] ); 
            } );
    }
    refreshToken() {
        return localStorage.getItem( 'refresh_token' );
    }
    getToken() {
        return localStorage.getItem( 'access_token' );
    }
    isLoggedIn(): boolean {
        let authToken = localStorage.getItem( 'access_token' ); 
        return authToken !== null ? true : false;
    }
    doLogout() {
         localStorage.removeItem( 'access_token' );
         localStorage.removeItem( 'refresh_token' );
         this.router.navigate( ['login'] ); 
    }
    
     
    // Error
    handleError( error: HttpErrorResponse ) {
        let msg = '';
        if ( error.error instanceof ErrorEvent ) {
            // client-side error
            msg = error.error.message;
        } else {
            // server-side error
            msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError( msg );
    }
}