import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthHttpService } from '../services/http-services/auth-http.service';
import { RouteService } from '../services/route.service';



@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanLoad {
  constructor(
    private authHttpService: AuthHttpService,
    private routeService: RouteService) {}

  async canLoad(route: Route, segments: UrlSegment[]) {
    return await new Promise<boolean>((resolve, reject)  => {
        this.authHttpService.isAdmin().subscribe((HttpResponse: any) => {
            const { isAdmin } = HttpResponse;
            resolve(isAdmin)
        }, (HttpError: HttpErrorResponse) => {
            this.routeService.toLogin();
            resolve(false)
            throwError(HttpError.error);
        })
    })
  }
}
