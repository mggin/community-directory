import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize, map } from 'rxjs/operators';
import { ACTIONS } from 'src/app/constant-data';
import { GroupHttpService } from 'src/app/services/http-services/group-http.service';
import { MemberHttpService } from 'src/app/services/http-services/member-http.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css'],
})
export class GroupFormComponent implements OnInit {
  action: string;
  group: any;
  requesting = false;
  members$: any;
  constructor(
    private groupHttpService: GroupHttpService,
    private memberHttpService: MemberHttpService,
    public dialogRef: MatDialogRef<GroupFormComponent>
  ) {}

  ngOnInit(): void {
    if (this.action === ACTIONS.EDIT) {
      const { id: groupId } = this.group;
      if (groupId) {
        this.members$ = this.memberHttpService
          .getMembersByGroup({ groupId })
          .pipe(
            map((members: any) => {
              return members.map((member) => {
                return {
                  id: member.id,
                  name: `${member.fullName} ${
                    member.otherName ? ', ' + member.otherName : ''
                  }`,
                };
              });
            })
          );
      }
    }
  }

  createGroup() {
    this.requesting = true;
    this.groupHttpService
      .createGroup(this.group)
      .pipe(
        finalize(() => {
          this.requesting = false;
        })
      )
      .subscribe((HttpResponse) => {
        this.dialogRef.close({ shouldRefresh: true });
      });
  }

  updateGroup() {
    this.requesting = true;
    this.groupHttpService
      .updateGroup(this.group)
      .pipe(
        finalize(() => {
          this.requesting = false;
        })
      )
      .subscribe((HttpResponse) => {
        this.dialogRef.close({ shouldRefresh: true });
      });
  }

}
