import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Community } from 'src/app/models/community';
import { CommunityForm } from 'src/app/models/community-form';
import { Message } from 'src/app/models/message';
import { CommunityHttpService } from 'src/app/services/http-services/community-http.service';

@Component({
  selector: 'app-community-form',
  templateUrl: './community-form.component.html',
  styleUrls: ['./community-form.component.css'],
})
export class CommunityFormComponent implements OnInit {
  community = new Community();
  communityForm = new CommunityForm();
  message = new Message();
  constructor(
    private communityHttpService: CommunityHttpService,
    public dialogRef: MatDialogRef<CommunityFormComponent>
  ) {}

  ngOnInit(): void {}

  createCommunity() {
    this.message = new Message();
    this.communityForm.requiredName = !this.community.name;
    this.communityForm.requiredPhone = !this.community.phone;
    if (
      Object.keys(this.communityForm).every((key) => !this.communityForm[key])
    ) {
      this.communityHttpService.createCommunity(this.community).subscribe(
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
