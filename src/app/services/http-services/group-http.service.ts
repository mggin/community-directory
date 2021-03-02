import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
// import { BecProps } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupHttpService {
  apiUrl = environment.apiUrl;
  // becApiUrl = `${this.apiUrl}/api/becs`;
  constructor(private http: HttpClient) {}
  getGroups(props: any = {}) {
    return this.http.get(`${this.apiUrl}/api/groups`, {
      params: { ...props },
    });
  }
  createGroup(props: any) {
    return this.http.post(`${this.apiUrl}/api/groups`, { ...props });
  }
  updateGroup(props: any) {
    return this.http.put(`${this.apiUrl}/api/groups`, { ...props });
  }
  deleteGroup(groupId: string) {
    return this.http.delete(`${this.apiUrl}/api/groups`, { params: { groupId }});
  }
}
