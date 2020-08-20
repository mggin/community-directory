import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  signIn(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/api/tmsl/sign-in`, {
      username,
      password,
    });
  }

  getHouseholders(filterFields = []) {
    return this.http.post(`${this.apiUrl}/api/tmsl/households`, {
      filterFields,
    });
  }

  createHousehold(householdDetail: unknown) {
    return this.http.post(`${this.apiUrl}/api/tmsl/create-household`, {
      params: householdDetail,
    });
  }

  getBecGroupOptions() {
    return this.http.get<string[]>(`${this.apiUrl}/api/tmsl/bec-group-options`);
  }

  getHousehold(householdId: string) {
    return this.http.get(`${this.apiUrl}/api/tmsl/household`, {
      params: { householdId },
    });
  }

  updateHousehold(householdId: string, params: any) {
    return this.http.put(`${this.apiUrl}/api/tmsl/household`, {
      householdId, params
    })
  }

  deleteHousehold(householdId: string) {
    return this.http.delete(`${this.apiUrl}/api/tmsl/household`, {
      params: { householdId }
    })
  }

  searchMembers(name: string) {
    return this.http.get(`${this.apiUrl}/api/tmsl/search/members`, {
      params: { name },
    });
  }

  getMembers(householdId: string) {
    return this.http.post(`${this.apiUrl}/api/tmsl/members`, {
      requestFields: [
        'id',
        'christian_name AS christianName',
        'ethnic_name AS ethnicName',
        'nick_name AS nickName',
        'birth_year AS birthYear',
        'phone',
        'gender',
      ],
      filterFields: [{ name: 'household_id', value: householdId }],
    });
  }

  createMembers(members: unknown[]) {
    return this.http.post(`${this.apiUrl}/api/tmsl/create-members`, { members });
  }

  updateMember(id: string, member: unknown) {
    return this.http.put(`${this.apiUrl}/api/tmsl/update/member`, {
      id, member
    })
  }

  deleteMember(memberId: string) {
    return this.http.delete(`${this.apiUrl}/api/tmsl/member`, {
      params: { memberId }
    })
  }
}
