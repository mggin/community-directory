import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  signIn(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/sign-in`, {
      username,
      password,
    });
  }

  signOut() {
    return this.http.get(`${this.apiUrl}/auth/sign-out`)
  }
}
