import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommunityProps } from 'src/app/interfaces';
import { Message } from 'src/app/models/message';
import { CommunityHttpService } from 'src/app/services/http-services/community-http.service';
import { CommunityCreatorComponent } from './community-creator/community-creator.component';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  communities: Observable<CommunityProps[]>;
  message = new Message();
  constructor(private communityHttpService: CommunityHttpService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCommunities();
  }

  loadCommunities() {
    this.communities = this.communityHttpService.getCommunitiesDetails();
  }

  deleteCommunity(communityId: string) {
    if (confirm(`Are you sure you want to remove this community from dashboard?`)) {
      this.message = new Message();
      this.communityHttpService.deleteCommunity(communityId).subscribe((HttpResponse) => {
        this.message.success = `Successfully deleted.`;
        this.loadCommunities();
      }, (HttpError) => {
        this.message.error = HttpError;
      })
    }
  }

  editCommunity(communityId: string) {
    console.log('edit')
  }

  addCommunity() {
    const dialogRef = this.dialog.open(CommunityCreatorComponent, {
      width: '400px',
    })
    dialogRef.afterClosed().subscribe((shouldReload) => {
       if (shouldReload) {
         this.loadCommunities();
       }
    })
  }
}
