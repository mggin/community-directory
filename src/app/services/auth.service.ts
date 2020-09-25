import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { decode } from 'punycode';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(private router: Router) {}

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
      payload = window.atob(token.split('.')[1]);
      const decodedToken = JSON.parse(payload);
      const { username } = decodedToken;
      localStorage.setItem('username', username);
      return decodedToken.exp > Date.now() / 1000;
    }
    return false;
  }
}
