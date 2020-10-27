import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaderProps } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaderHttpService {

  apiUrl = environment.apiUrl;
  leaderApiUrl = `${this.apiUrl}/api/leaders`;
  constructor(private http: HttpClient) {}
  getLeaders() {
    return this.http.get(this.leaderApiUrl);
  }
  getLeader(leaderId: string) {
    return this.http.get(`${this.leaderApiUrl}/${leaderId}`);
  }
  createLeader(props: LeaderProps) {
    return this.http.post(this.leaderApiUrl, { ...props });
  }
  updateLeader(leaderId: string, props: LeaderProps) {
    return this.http.put(`${this.leaderApiUrl}/${leaderId}`, {
      ...props,
    });
  }
  deleteLeader(leaderId: string) {
    return this.http.delete(`${this.leaderApiUrl}/${leaderId}`);
  }
}
