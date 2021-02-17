import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommunityProps } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommunityHttpService {
  apiUrl = environment.apiUrl;
  communityApiUrl = `${this.apiUrl}/api/communities`;
  constructor(private http: HttpClient) {}
  getCommunities(attributes: string[]) {
    return this.http.get<CommunityProps[]>(this.communityApiUrl, {
      params: { attributes },
    });
  }

  createCommunity(props: CommunityProps) {
    return this.http.post(this.communityApiUrl, { ...props });
  }
  // updateCommunity(communityId: string, props: CommunityProps) {
  //   return this.http.put(`${this.communityApiUrl}/${communityId}`, {
  //     ...props,
  //   });
  // }
  // deleteCommunity(communityId: string) {
  //   return this.http.delete(this.communityApiUrl, { params: { communityId } });
  // }
}
