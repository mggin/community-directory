import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { ACTIONS } from 'src/app/constant-data';
import { Message } from 'src/app/models/message';
import { LeaderHttpService } from 'src/app/services/http-services/leader-http.service';
import { MemberHttpService } from 'src/app/services/http-services/member-http.service';

@Component({
  selector: 'app-leader-form',
  templateUrl: './leader-form.component.html',
  styleUrls: ['./leader-form.component.css'],
})
export class LeaderFormComponent implements OnInit {
  action: string;
  leader: any;
  message = new Message();
  verifiedMembers = [];
  requesting = false;
  constructor(
    private memberHttpService: MemberHttpService,
    private leaderHttpService: LeaderHttpService,
    public dialogRef: MatDialogRef<LeaderFormComponent>
  ) {}

  ngOnInit(): void {}

  handleOnKeyUp(event: any) {
    const { value: name } = event.target;
    this.memberHttpService
      .searchMembers({
        name,
        size: 5,
      })
      .subscribe((members: any) => {
        if (members.length > 0) {
          console.log(this.verifiedMembers);
          this.verifiedMembers = members.map((member) => {
            const { fullName, otherName, id } = member;
            return {
              id,
              name: `${fullName}${otherName ? ', ' + otherName : ''}`,
            };
          });
        }
      });
  }

  validateLeader() {
    if (this.leader.role && this.leader.name) {
      const index = this.verifiedMembers.findIndex(
        (member) => member.name == this.leader.name
      );
      if (index >= 0) {
        this.leader.memberId = JSON.parse(
          JSON.stringify(this.verifiedMembers[index]['id'])
        );
        return true;
      }
      return this.action === ACTIONS.EDIT && this.verifiedMembers.length === 0;
    }
    return false;
  }

  assignLeader() {
    this.message = new Message();
    if (this.validateLeader()) {
      this.requesting = true;
      this.leaderHttpService
        .createLeader(this.leader)
        .pipe(
          finalize(() => {
            this.requesting = false;
          })
        )
        .subscribe(
          (HttpResponse) => {
            this.dialogRef.close({ shouldRefresh: true });
          },
          (HttpError) => {
            this.message.error = HttpError.error.message;
          }
        );
    } else {
      this.message.error = `Invalid Input.`;
    }
  }

  updateLeader() {
    this.message = new Message();
    if (this.validateLeader()) {
      this.requesting = true;
      this.leaderHttpService
        .updateLeader(this.leader)
        .pipe(
          finalize(() => {
            this.requesting = false;
          })
        )
        .subscribe(
          (HttpResponse) => {
            this.dialogRef.close({ shouldRefresh: true });
          },
          (HttpError) => {
            this.message.error = HttpError.error.message;
          }
        );
    } else {
      this.message.error = `Invalid Input.`;
    }
  }
}
