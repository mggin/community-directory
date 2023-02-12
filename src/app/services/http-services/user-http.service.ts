import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get(`${this.apiUrl}/api/users`);
  }
  updateUserStatus(props: any) {
    return this.http.patch(`${this.apiUrl}/api/users/status`, {
      ...props,
    });
  }
  createUser(props: any) {
    return this.http.post(`${this.apiUrl}/api/users`, { ...props });
  }
  deleteUser(userId: string) {
    return this.http.delete(`${this.apiUrl}/api/users`, {
      params: { userId },
    });
  }
}
