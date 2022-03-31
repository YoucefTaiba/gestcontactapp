import { Injectable } from '@angular/core';
import { MessageService } from '../service/message.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,retry  } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
             /* catchError((requestError:HttpErrorResponse) => {
                  if(typeof requestError ==='string' ){
                      return throwError(() => new Error(requestError));
                  }else   
                 if (requestError&& requestError.status !== 401) {
                  const { error } = requestError;
                  this.messageService.add( 'error: '+`HTTP Error - ${requestError.status}`+error.message );
                }
                return throwError(() => new Error(requestError.message));
              })*/
              retry(1),
              catchError((error: HttpErrorResponse) => {
                  let errorMessage = '';
                  if (error instanceof ErrorEvent) {
                      // client-side error
                      errorMessage = `Error: ${error}`;
                  } else {
                      // server-side error
                      errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                  }
                  this.messageService.add(errorMessage);
                  return throwError(errorMessage);
              })
            );
  }
}
