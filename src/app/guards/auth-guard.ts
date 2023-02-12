import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ValidationService } from '../services/validation.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private validationService: ValidationService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot) {
    const shouldActivate = await this.validationService.validateSession();
    if (!shouldActivate) {
      this.router.navigate(['login']);
    }
    return shouldActivate;
  }
}
