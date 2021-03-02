import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommunityHttpService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getCommunities(attributes = []) {
    return this.http.get(`${this.apiUrl}/api/communities`, {
      params: { attributes },
    });
  }

  createCommunity(props: any) {
    return this.http.post(`${this.apiUrl}/api/communities`, { ...props });
  }
}
