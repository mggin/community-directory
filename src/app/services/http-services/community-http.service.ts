import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommunityProps } from 'src/app/interfaces/community-interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommunityHttpService {
  apiUrl = environment.apiUrl;
  communityApiUrl = `${this.apiUrl}/api/communities`;
  constructor(private http: HttpClient) {}
  getCommunities() {
    return this.http.get(this.communityApiUrl);
  }
  getCommunity(communityId: string) {
    return this.http.get(`${this.communityApiUrl}/${communityId}`);
  }
  createCommunity(props: CommunityProps) {
    return this.http.post(this.communityApiUrl, { ...props });
  }
  updateCommunity(communityId: string, props: CommunityProps) {
    return this.http.put(`${this.communityApiUrl}/${communityId}`, {
      ...props,
    });
  }
  deleteCommunity(communityId: string) {
    return this.http.delete(`${this.communityApiUrl}/${communityId}`);
  }
}
