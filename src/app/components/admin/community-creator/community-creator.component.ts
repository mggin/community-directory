import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Community } from 'src/app/models/community';
import { Message } from 'src/app/models/message';
import { CommunityHttpService } from 'src/app/services/http-services/community-http.service';

@Component({
  selector: 'app-community-creator',
  templateUrl: './community-creator.component.html',
  styleUrls: ['./community-creator.component.css']
})
export class CommunityCreatorComponent implements OnInit {
  community = new Community();
  message = new Message();
  constructor(private communityHttpService: CommunityHttpService,
  private dialogRef: MatDialogRef<CommunityCreatorComponent>) { }
  ngOnInit(): void {

  }

  addCommunity() {
    this.message = new Message();
    const { name, communityCode } = this.community;
    if (name && communityCode) {
       this.communityHttpService.createCommunity(this.community).subscribe((HttpResponse) => {
          const shouldReload = true;
          this.dialogRef.close(shouldReload);
       }, (HttpError: HttpErrorResponse) => {
          this.message.error = HttpError.error;
       })
    } else {
       this.message.error =  `Please fill out the missing fields.`
    }
  }

  convertToUpperCase() {
    this.community.communityCode = this.community.communityCode.toUpperCase();
  }
}
