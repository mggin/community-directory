import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeaderHttpService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getLeaders() {
    return this.http.get(`${this.apiUrl}/api/leaders`);
  }
  createLeader(props: any) {
    return this.http.post(`${this.apiUrl}/api/leaders`, { ...props });
  }
  updateLeader(props: any) {
    return this.http.put(`${this.apiUrl}/api/leaders`, {
      ...props,
    });
  }
  deleteLeader(leaderId: string) {
    return this.http.delete(`${this.apiUrl}/api/leaders`, {
      params: { leaderId },
    });
  }
}
