
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, from } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AuthService } from './service/auth.service'
// const observable = from(Promise);
@Injectable()
export class GestContactInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;
    private refreshTokenSubject = new BehaviorSubject(null);
    constructor(public authService: AuthService) { }


    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(this.addAuthToken(request)).pipe(
            catchError((requestError: HttpErrorResponse) => {
                if (requestError && (requestError.status === 401 || requestError.status === 403)) {
                    
                    if (this.refreshTokenInProgress) {
                        return this.refreshTokenSubject.pipe(
                            filter((result) => result !== null),
                            take(1),
                            switchMap(() => next.handle(this.addAuthToken(request)))
                        );
                    } else {
                        this.refreshTokenInProgress = true;
                        this.refreshTokenSubject.next(null);

                        return this.refreshTokenSubject.pipe(
                            switchMap((token) => {
                                this.refreshTokenSubject.next(token);
                                return next.handle(this.addAuthToken(request));
                            }),
                            finalize(() => (this.refreshTokenInProgress = false))
                        );
                    }
                    
                } else {
                    return throwError(() => new Error(requestError.message || requestError.statusText));
                }
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
