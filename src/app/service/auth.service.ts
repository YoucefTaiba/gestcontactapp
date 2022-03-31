
import { Injectable } from '@angular/core'; 
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject,Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable()
export class AuthService {
    endpoint: string = environment.apiBaseUrl;
    headers = new HttpHeaders().set( 'Content-Type', 'application/json' );
    currentUser = {};

    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );
    constructor( private http: HttpClient, public router: Router ) {
        localStorage.removeItem( 'acesse_token' );
        localStorage.removeItem( 'refresh_token' );
    }
    // //registre
    // registre( user: User ): Observable<any> {
    //     let api = `${this.endpoint}/user/add`;
    //     return this.http.post( api, user ).pipe( catchError( this.handleError ) );
    // }
    // Sign-in
    signIn( user: User ) {
        return this.http
            .post<any>( `${this.endpoint}/login`, user ).pipe(
            catchError(( res: HttpErrorResponse ) => {return  this.handleError( res ) } )
            )
            .subscribe(( res: any ) => {
                localStorage.setItem( 'acesse_token', res.acesse_token );
                localStorage.setItem( 'refresh_token', res.refresh_token );
                localStorage.setItem( 'roles', res.roles );
                this.router.navigate( ['home'] );
            } );
    }
    refreshToken() {
        let token = localStorage.getItem( 'refresh_token' );

        return this.http
            .post<any>( `${this.endpoint}/token/refresh`,null ) .subscribe(( res: any ) => {
                localStorage.setItem( 'acesse_token', res.acesse_token );
                localStorage.setItem( 'refresh_token', res.refresh_token );
                localStorage.setItem( 'roles', res.roles );
            } );
    }
    get getrefreshToken() {
        return localStorage.getItem( 'refresh_token' );
    }
    get getToken() {
        return localStorage.getItem( 'acesse_token' );
    }
    get isLoggedIn(): boolean {
        let authToken = localStorage.getItem( 'acesse_token' );
        return ( authToken == null || authToken === " undefined" ) ? false : true;
    }
    doLogout() {
        localStorage.removeItem( 'acesse_token' );
        localStorage.removeItem( 'refresh_token' );
        this.router.navigate( ['login'] );
    }
    get getRoles(): any {
        const roles = localStorage.getItem( 'roles' );;
        if ( roles ) {
            return roles.split( "," );
        }
        return {};
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