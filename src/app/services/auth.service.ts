import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { decode } from 'punycode';
import { ValidationService } from './validation.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(private router: Router, private validationService: ValidationService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const { redirect } = route.data;
    if (this.isLoggedIn()) {
      if (redirect) {
        this.router.navigate(['board']);
      } else {
        return true;
      }
    } else {
      if (!redirect) {
        this.router.navigate(['login']);
      } else {
        return redirect;
      }
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('accessToken');
    let payload: string;
    if (token) {
      const decodedToken = this.validationService.DecodeToken(token);
      return decodedToken.exp > Date.now() / 1000;
    }
    return false;
  }
}
