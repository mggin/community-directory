import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ValidationService } from '../services/validation.service';


@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private validationService: ValidationService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    localStorage.clear();
    return true
  }
}
