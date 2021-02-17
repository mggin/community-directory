import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProps } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  apiUrl = environment.apiUrl;
  userApiUrl = `${this.apiUrl}/api/users`;
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get<Partial<UserProps[]>>(this.userApiUrl);
  }
  updateUserStatus(props: any) {
    return this.http.patch(`${this.userApiUrl}/status`, {
      ...props,
    });
  }
  // getMember(memberId: string) {
  //   return this.http.get(`${this.memberApiUrl}/${memberId}`);
  // }
  // searchMember(name: string, size: string = undefined ) {
  //   const params = { name }
  //   size ? params['size'] = size : null;
  //   return this.http.get(`${this.memberApiUrl}/search`, { params });
  // }
  createUser(props: Partial<UserProps>) {
    return this.http.post(this.userApiUrl, { ...props });
  }
  // updateMember(memberId: string, props: Partial<MemberProps>) {
  //   return this.http.put(`${this.memberApiUrl}/${memberId}`, {
  //     ...props,
  //   });
  // }
  deleteUser(userId: string) {
    return this.http.delete(this.userApiUrl, {
      params: { userId }
    });
  }
}
