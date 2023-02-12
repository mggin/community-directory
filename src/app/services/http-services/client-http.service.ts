import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ClientHttpService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getClients() {
    return this.http.get(`${this.apiUrl}/api/clients`);
  }

  createClient(props: any) {
    return this.http.post(`${this.apiUrl}/api/clients`, { ...props });
  }
  updateClientStatus(props: any) {
    return this.http.patch(`${this.apiUrl}/api/clients/status`, {
      ...props,
    });
  }
  updateClient(props: any) {
    return this.http.put(`${this.apiUrl}/api/clients`, {
      ...props,
    });
  }
  deleteClient(clientId: any) {
    return this.http.delete(`${this.apiUrl}/api/clients`, {
      params: { clientId },
    });
  }
}
