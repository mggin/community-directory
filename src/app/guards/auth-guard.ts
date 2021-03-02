import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ValidationService } from '../services/validation.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private validationService: ValidationService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.validationService.validateSession()||this.router.navigate(['login'])
  }
}
