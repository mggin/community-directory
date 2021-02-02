import { HttpResponse } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { ACTIONS } from 'src/app/constant-data';
import { Leader } from 'src/app/models/leader';
import { Member } from 'src/app/models/member';
import { Message } from 'src/app/models/message';
import { LeaderHttpService } from 'src/app/services/http-services/leader-http.service';
import { MemberHttpService } from 'src/app/services/http-services/member-http.service';

@Component({
  selector: 'assign-leader',
  templateUrl: './assign-leader.component.html',
  styleUrls: ['./assign-leader.component.css'],
})
export class AssignLeaderComponent implements OnInit {
  leader: Leader = new Leader();
  populatedMembers: any;
  disableActions = false;
  createMode: boolean;
  editMode: boolean;
  errorMessage: string;
  message = new Message();
  constructor(
    private leaderHttpService: LeaderHttpService,
    private memberHttpService: MemberHttpService,
    private dialogRef: MatDialogRef<AssignLeaderComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.leader = this.data.leader;
    this.createMode = this.data.action === ACTIONS.CREATE;
    this.editMode = this.data.action === ACTIONS.EDIT;
  }

  test() {
    console.log(this.leader);
  }

  handleOnChange(event: any) {
    const name = event.target.value;
    const member = JSON.parse(
      JSON.stringify(
        this.populatedMembers.filter((member) => {
          return member.name === name;
        })
      )
    )[0];
    if (member) {
      this.leader.memberId = member.id;
    } else {
      this.message.error = `Please choose the valid member.`
    }
  }

  handleOnKeyUp(event: any) {
    const name = event.target.value;
    const size = `5`;
    this.memberHttpService
      .searchMember(name, size)
      .subscribe((HttpResponse) => {
        this.populatedMembers = HttpResponse;
      });
  }

  updateLeader() {
    const { id, memberId } = this.leader;
    if (id && memberId) {
      this.disableActions = true;
      this.leaderHttpService
        .updateLeader(id, this.leader)
        .pipe(
          finalize(() =>
            setTimeout(() => {
              this.disableActions = false;
            }, 2000)
          )
        )
        .subscribe(
          (HttpResponse) => { this.dialogRef.close({shouldUpdate: true}) },
          (HttpError) => {
            this.errorMessage = HttpError;
          }
        );
    } else {
      this.message.error = `Please select the valid member.`
    }
  }

  assignLeader() {
    const { memberId } = this.leader;
    if (memberId) {
      this.disableActions = true;
      this.leaderHttpService
        .createLeader(this.leader)
        .pipe(
          finalize(() =>
            setTimeout(() => {
              this.disableActions = false;
            }, 2000)
          )
        )
        .subscribe(
          (HttpResponse) => { this.dialogRef.close({shouldUpdate: true}) },
          (HttpError) => { this.errorMessage = HttpError }
        );
    } else {
      this.errorMessage = `Please select the valid member.`
    }
  }
}
