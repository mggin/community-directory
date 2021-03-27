import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { Community } from 'src/app/models/community';
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

  updateUserStatus(user: any) {
    const { id: userId, active } = user;
    user.active = !user.active;
    this.userHttpService
      .updateUserStatus({ userId, active: !active })
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
      disableClose: true,
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

  // addCommunity() {
  //   const dialogRef = this.dialog.open(CommunityFormComponent, {
  //     width: '400px',
  //     disableClose: true,
  //   });
  //   dialogRef.afterClosed().subscribe(({ shouldReload }) => {
  //     if (shouldReload) {
  //       this.getCommunities();
  //     }
  //   });
  // }

  openCommunityForm(action: string, selectedCommunity: any) {
    const dialogRef = this.dialog.open(CommunityFormComponent, {
      width: '400px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((shouldReload) => {
      if (shouldReload) {
        this.getCommunities();
      }
    });

    dialogRef.componentInstance.community = new Community(selectedCommunity)
    dialogRef.componentInstance.action = action;
  }

  deleteCommunity(communityId: string) {
    if (confirm('Are you sure you want to delete this community?')) {
      this.communityHttpService.deleteCommunity({ communityId }).subscribe(
        (_) => {
          this.getCommunities();
        },
        (HttpError) => {
          this.message.error = HttpError.error.message;
        }
      );
    }
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

  updateClientStatus(client: any) {
    const { id: clientId, active } = client;
    client.active = !client.active;
    this.clientHttpService
      .updateClientStatus({ clientId, active: !active })
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
