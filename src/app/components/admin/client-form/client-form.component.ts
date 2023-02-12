import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientForm } from 'src/app/models/client-form';
import { Message } from 'src/app/models/message';
import { ClientHttpService } from 'src/app/services/http-services/client-http.service';
import { CommunityHttpService } from 'src/app/services/http-services/community-http.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  action: string;
  client: Client;
  clientForm = new ClientForm();
  communities$: Observable<any>;
  message = new Message();
  constructor(
    private communityHttpService: CommunityHttpService,
    private clientHttpService: ClientHttpService,
    public dialogRef: MatDialogRef<ClientFormComponent>
  ) {}

  ngOnInit(): void {
    this.communities$ = this.communityHttpService.getCommunities([
      'id',
      'name',
    ]);
  }

  createClient() {
    this.message = new Message();
    this.clientForm.requiredCommunityCode = !this.client.communityCode;
    this.clientForm.requiredCommunityId = !this.client.communityId;
    if (Object.keys(this.clientForm).every((key) => !this.clientForm[key])) {
      this.clientHttpService.createClient(this.client).subscribe(
        (HttpResponse) => {
          this.dialogRef.close({ shouldReload: true });
        },
        (HttpError) => {
          this.message.error = HttpError.error.message;
        }
      );
    } else {
      this.message.error = 'Please fill out the required fields.';
    }
  }

  updateClient() {
    this.message = new Message();
    this.clientForm.requiredCommunityCode = !this.client.communityCode;
    this.clientForm.requiredCommunityId = !this.client.communityId;
    if (Object.keys(this.clientForm).every((key) => !this.clientForm[key])) {
      this.clientHttpService.updateClient(this.client).subscribe(
        (HttpResponse) => {
          this.dialogRef.close({ shouldReload: true });
        },
        (HttpError) => {
          this.message.error = HttpError.error.message;
        }
      );
    } else {
      this.message.error = 'Please fill out the required fields.';
    }
  }
}
