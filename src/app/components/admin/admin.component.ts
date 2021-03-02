import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { Message } from 'src/app/models/message';
import { ClientHttpService } from 'src/app/services/http-services/client-http.service';
import { CommunityHttpService } from 'src/app/services/http-services/community-http.service';
import { UserHttpService } from 'src/app/services/http-services/user-http.service';
import { ClientFormComponent } from './client-form/client-form.component';
import { CommunityFormComponent } from './community-form/community-form.component';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  // communities: Observable<CommunityProps[]>;
  message = new Message();
  TAB = {
    USER: 'user',
    CLIENT: 'client',
    COMMUNITY: 'community',
  };
  selectedTab = this.TAB.USER;
  users$: Observable<any>;
  communities$: Observable<any>;
  clients: any;
  constructor(
    private communityHttpService: CommunityHttpService,
    private userHttpService: UserHttpService,
    private clientHttpService: ClientHttpService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  changeTab(tabName: string) {
    const { USER, CLIENT, COMMUNITY } = this.TAB;
    switch (tabName) {
      case USER:
        this.getUsers();
        break;
      case CLIENT:
        this.getClients();
        break;
      case COMMUNITY:
        this.getCommunities();
        break;
      default:
        break;
    }
    this.selectedTab = tabName;
  }

  getUsers() {
    this.users$ = this.userHttpService.getUsers();
  }

  updateUserStatus(status: boolean, userId: string) {
    const updatedStatus = !status;
    this.userHttpService
      .updateUserStatus({ userId, active: updatedStatus })
      .subscribe(
        (HttpResponse) => {
          console.log({ HttpResponse });
        },
        (HttpError) => {
          console.log(HttpError.message);
        }
      );
  }

  addUser() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((shouldReload) => {
      if (shouldReload) {
        this.getUsers();
      }
    });
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userHttpService.deleteUser(userId).subscribe(
        (HttpResponse) => {
          this.getUsers();
        },
        (HttpError) => {
          this.message.error = HttpError;
        }
      );
    }
  }

  getCommunities() {
    this.communities$ = this.communityHttpService.getCommunities();
  }

  addCommunity() {
    const dialogRef = this.dialog.open(CommunityFormComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(({ shouldReload }) => {
      if (shouldReload) {
        this.getCommunities();
      }
    });
  }

  getClients() {
    this.clientHttpService.getClients().subscribe(
      (HttpResponse: any) => {
        this.clients = HttpResponse.map((res) => {
          return {
            ...res,
            codeVisibility: false,
          };
        });
      },
      (HttpError) => {}
    );
  }

  openClientForm(action: string, selectedClient: any) {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      width: '300px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((shouldReload) => {
      if (shouldReload) {
        this.getClients();
      }
    });
    
    dialogRef.componentInstance.client = new Client(selectedClient);
    dialogRef.componentInstance.action = action;
  }

  changeCodeVisibility(client: any) {
    client.codeVisibility = !client.codeVisibility;
  }

  updateClientStatus(status: boolean, clientId: string) {
    console.log({ clientId });
    const updatedStatus = !status;
    this.clientHttpService
      .updateClientStatus({ clientId, active: updatedStatus })
      .subscribe(
        (HttpResponse) => {
          console.log(HttpResponse);
        },
        (HttpError) => {
          console.log(HttpError);
        }
      );
  }

  deleteClient(clientId: string) {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientHttpService
        .deleteClient(clientId)
        .subscribe((HttpResponse) => {
          this.getClients();
        });
    }
  }
}
