import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberProps } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemberHttpService {
  apiUrl = environment.apiUrl;
  memberApiUrl = `${this.apiUrl}/api/members`;
  constructor(private http: HttpClient) {}
  getMembers(size: string = undefined) {
    return this.http.get(this.memberApiUrl, { params: { size } });
  }
  getMember(memberId: string) {
    return this.http.get(`${this.memberApiUrl}/${memberId}`);
  }
  searchMember(name: string, size: string = undefined ) {
    const params = { name }
    size ? params['size'] = size : null;
    return this.http.get(`${this.memberApiUrl}/search`, { params });
  }
  createMember(props: Partial<MemberProps>) {
    return this.http.post(this.memberApiUrl, { ...props });
  }
  updateMember(memberId: string, props: Partial<MemberProps>) {
    return this.http.put(`${this.memberApiUrl}/${memberId}`, {
      ...props,
    });
  }
  deleteMember(memberId: string) {
    return this.http.delete(`${this.memberApiUrl}/${memberId}`);
  }
}
