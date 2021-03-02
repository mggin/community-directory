import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RouteService } from './route.service';
import { InterceptorSkip } from './http-services/auth-http.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private routeService: RouteService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers && req.headers.has(InterceptorSkip)) {
      const headers = req.headers.delete(InterceptorSkip);
      return next.handle(req.clone({ ...headers, withCredentials: true }));
    } else {
      const accessToken = localStorage.getItem('accessToken') || '';
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', accessToken),
        withCredentials: true,
      });
      return next.handle(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            const { status, message } = error;
            if (status === 401) {
              localStorage.clear();
              this.routeService.toLogin();
            }
          }
          return throwError(error);
        })
      );
    }
  }
}
