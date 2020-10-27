import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HouseholdProps } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HouseholdHttpService {
  apiUrl = environment.apiUrl;
  householdApiUrl = `${this.apiUrl}/api/households`;
  constructor(private http: HttpClient) {}
  getHouseholds() {
    return this.http.get(this.householdApiUrl);
  }
  getHouseholdsLastEntry() {
    return this.http.get(`${this.householdApiUrl}/last-entry`);
  }
  getHousehold(householdId: string) {
    return this.http.get(`${this.householdApiUrl}/${householdId}`);
  }
  getHouseholdInfo(householdId: string) {
    return this.http.get(`${this.householdApiUrl}/${householdId}/info`)
  }
  createHousehold(props: Partial<HouseholdProps>) {
    return this.http.post(this.householdApiUrl, { ...props });
  }
  updateHousehold(householdId: string, props: Partial<HouseholdProps>) {
    return this.http.put(`${this.householdApiUrl}/${householdId}`, {
      ...props,
    });
  }
  updateHouseholder(props: Partial<HouseholdProps>) {
    const { householdId, householderId } = props;
    return this.http.patch(`${this.householdApiUrl}/${householdId}/householder`, {
      householderId
    })
  }
  deleteHousehold(householdId: string) {
    return this.http.delete(`${this.householdApiUrl}/${householdId}`);
  }
}
