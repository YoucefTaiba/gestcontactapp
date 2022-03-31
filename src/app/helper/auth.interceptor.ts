
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; 
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) { }


    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(this.addAuthToken(request)).pipe(
            catchError((requestError: HttpErrorResponse) => {
                // if (requestError && (requestError.status === 401 || requestError.status === 403)) {
                    if (!this.authService.isLoggedIn) {
                         this.router.navigate(['login']);
                    } else {
                        this.authService.refreshToken();
                    } 

                return throwError(() => new Error(requestError.message || requestError.statusText));
            })
        );
    }
    addAuthToken(request: HttpRequest<any>) {
        const token = this.authService.getToken;

        if (token == null || token === "undefined") {
            return request;
        }

        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    } 

}
