import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Group } from 'src/app/models/group';
import { Message } from 'src/app/models/message';
import { GroupHttpService } from 'src/app/services/http-services/group-http.service';
import { GroupFormComponent } from '../group-form/group-form.component';

@Component({
  selector: 'app-manage-group',
  templateUrl: './manage-group.component.html',
  styleUrls: ['./manage-group.component.css'],
})
export class ManageGroupComponent implements OnInit {
  groups: any;
  message = new Message();
  constructor(
    private dialog: MatDialog,
    private groupHttpService: GroupHttpService,
    public dialogRef: MatDialogRef<ManageGroupComponent>
  ) {}

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups() {
    this.groups = this.groupHttpService.getGroups();
  }

  openGroupForm(action: string, selectedGroup = {}) {
    const dialogRef = this.dialog.open(GroupFormComponent, {
      width: '20vw',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result['shouldRefresh']) {
        this.getGroups();
      }
    });

    dialogRef.componentInstance.action = action;
    dialogRef.componentInstance.group = new Group(selectedGroup);
  }

  deleteGroup(groupId: string) {
    if (confirm('Are you sure you want to delete this Group?')) {
      this.groupHttpService.deleteGroup(groupId).subscribe(
        (HttResponse) => {
          this.getGroups();
        },
        (HttpError) => {
          console.log(HttpError)
          this.message.error = HttpError.error.message;
        }
      );
    }
  }
}
