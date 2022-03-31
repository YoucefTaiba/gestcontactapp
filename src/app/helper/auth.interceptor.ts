
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;
    private refreshTokenSubject = new BehaviorSubject( null );
    constructor( private authService: AuthService, private router: Router ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle( this.addAuthToken( request ) ).pipe(
            catchError(( requestError: HttpErrorResponse ) => {
                if ( requestError && requestError.status === 401 ) {
                    if ( this.refreshTokenInProgress ) {
                        return this.refreshTokenSubject.pipe(
                            filter(( result ) => result !== null ),
                            take( 1 ),
                            switchMap(() => next.handle( this.addAuthToken( request ) ) )
                        );
                    } else {
                        this.refreshTokenInProgress = true;
                        this.refreshTokenSubject.next( null );
                        this.authService.refreshToken();
                        this.refreshTokenInProgress = false
                        return next.handle( this.addAuthToken( request ) );
                        /*
                        return this.authService.refreshToken().pipe(
                                filter(( token ) => token !== token ),
                                switchMap(( token ) => {
                                this.refreshTokenSubject.next( token );
                                return next.handle( this.addAuthToken( request ) );
                            } ),
                            finalize(() => ( this.refreshTokenInProgress = false ) )
                        );*/
                    }
                } else {
                    return throwError(() => new Error( requestError.message ) );
                }
            } )
        );
    }
    addAuthToken( request: HttpRequest<any> ) {
        const token = this.authService.getToken;

        if ( token == null || token === "undefined" ) {
            return request;
        }

        return request.clone( {
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        } );
    }

}
