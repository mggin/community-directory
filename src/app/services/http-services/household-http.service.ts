import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HouseholdHttpService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getHouseholds(props = {}) {
    return this.http.get(`${this.apiUrl}/api/households`, {
      params: { ...props },
    });
  }
  getHouseholders(props: any) {
    return this.http.get(`${this.apiUrl}/api/householders`, {
      params: { ...props },
    });
  }
  getHousehold(props: any) {
    return this.http.get(`${this.apiUrl}/api/household`, {
      params: { ...props },
    });
  }
  createHousehold(props: any) {
    return this.http.post(`${this.apiUrl}/api/households`, { ...props });
  }
  updateHousehold(props: any) {
    return this.http.put(`${this.apiUrl}/api/households`, {
      ...props,
    });
  }
  deleteHousehold(householdId: string) {
    return this.http.delete(`${this.apiUrl}/api/households`, {
      params: { householdId },
    });
  }
}
