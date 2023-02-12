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
    private routeService: RouteService
  ) {}

  async canLoad(route: Route, segments: UrlSegment[]) {
    return await new Promise<boolean>((resolve, reject) => {
      this.authHttpService.isAdmin().subscribe(
        (HttpResponse: any) => {
          const { admin } = HttpResponse;
          resolve(admin);
        },
        (HttpError: any) => {
          console.log(HttpError.status);
          const { status } = HttpError;
          if (status === 401) {
            this.routeService.toLogin();
          } else if (status === 403) {
            this.routeService.toBoard();
          }
          resolve(false);
          throwError(HttpError.error);
        }
      );
    });
  }
}
