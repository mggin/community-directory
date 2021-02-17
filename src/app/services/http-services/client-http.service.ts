import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientProps } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ClientHttpService {
  apiUrl = environment.apiUrl;
  clientApiUrl = `${this.apiUrl}/api/clients`;
  constructor(private http: HttpClient) {}
  getClients() {
    return this.http.get<ClientProps[]>(this.clientApiUrl);
  }

  createClient(props: Partial<ClientProps>) {
    return this.http.post(this.clientApiUrl, { ...props });
  }
  updateClientStatus(props: any) {
    return this.http.patch(`${this.clientApiUrl}/status`, {
      ...props,
    });
  }
  // deleteCommunity(communityId: string) {
  //   return this.http.delete(this.communityApiUrl, { params: { communityId } });
  // }
}
