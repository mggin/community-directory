import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemberHttpService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getMembers(props = {}) {
    return this.http.get(`${this.apiUrl}/api/members`, {
      params: { ...props },
    });
  }
  searchMembers(props: any) {
    return this.http.get(`${this.apiUrl}/api/members/search`, {
      params: { ...props },
    });
  }
  getMembersByGroup(props: any) {
    return this.http.get(`${this.apiUrl}/api/members/group`, {
      params: { ...props },
    });
  }
  createMember(props: any) {
    return this.http.post(`${this.apiUrl}/api/members`, { ...props });
  }
  updateMember(props: any) {
    return this.http.put(`${this.apiUrl}/api/members`, {
      ...props,
    });
  }
  deleteMember(props: any) {
    return this.http.delete(`${this.apiUrl}/api/members`, {
      params: { ...props },
    });
  }
}
