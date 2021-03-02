import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export const InterceptorSkip = 'X-Skip-Interceptor';
export const InterceptorSkipHeader = new HttpHeaders({
  'X-Skip-Interceptor': ''
});

@Injectable({
  providedIn: 'root',
})

export class AuthHttpService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  signIn(username: string, password: string) {
    console.log(username, password)
    return this.http.post(`${this.apiUrl}/auth/sign-in`, {
      username,
      password,
    }, { headers: InterceptorSkipHeader });
  }

  signOut() {
    return this.http.get(`${this.apiUrl}/auth/sign-out`)
  }

  isAdmin() {
    return this.http.get(`${this.apiUrl}/auth/admin`, { headers: InterceptorSkipHeader } )
  }

  valideSession() {
    return this.http.get(`${this.apiUrl}/auth/user/session`, { headers: InterceptorSkipHeader } )
  }
}
