import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BecProps } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BecsHttpService {
  apiUrl = environment.apiUrl;
  becApiUrl = `${this.apiUrl}/api/becs`;
  constructor(private http: HttpClient) {}
  getBecs() {
    return this.http.get(this.becApiUrl);
  }
  getBec(becId: string) {
    return this.http.get(`${this.becApiUrl}/${becId}`);
  }
  getBecDetails(becId: string) {
    return this.http.get(`${this.becApiUrl}/${becId}/details`);
  }
  createBec(props: Partial<BecProps>) {
    return this.http.post(this.becApiUrl, { ...props });
  }
  updateBec(becId: string, props: Partial<BecProps>) {
    return this.http.put(`${this.becApiUrl}/${becId}`, { ...props });
  }
  updateBecLeader(becId: string, props: Partial<BecProps>) {
    return this.http.patch(`${this.becApiUrl}/${becId}/leader`, { ...props });
  }
  updateBecAssistant(becId: string, props: Partial<BecProps>) {
    return this.http.patch(`${this.becApiUrl}/${becId}/assistant`, {
      ...props,
    });
  }
  removeBec(becId: string) {
    return this.http.delete(`${this.becApiUrl}/${becId}`);
  }
}
