import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { COMMITTEE_ACTIONS } from 'src/app/constant-data';
import { CommitteeMember } from 'src/app/models/committee-member';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-assign-committee',
  templateUrl: './assign-committee.component.html',
  styleUrls: ['./assign-committee.component.css'],
})
export class AssignCommitteeComponent implements OnInit {
  action: string;
  members: any;
  COMMITTEE_ACTIONS = COMMITTEE_ACTIONS;
  committeeMember: CommitteeMember;
  prevAssignee: CommitteeMember;
  isLoading = false;
  constructor(
    private httpService: HttpService,
    private dialogRef: MatDialogRef<AssignCommitteeComponent>
  ) {}

  ngOnInit(): void {
    this.prevAssignee = JSON.parse(JSON.stringify(this.committeeMember));
  }

  handleOnChange(event: any) {
    const name = event.target.value;
    this.httpService.searchMembers(name, 5).subscribe(
      (HttpResponse) => {
        console.log(HttpResponse);
        this.members = HttpResponse['data'];
      },
      (HttpError) => {
        console.log(HttpError);
      }
    );
  }

  disableAssign() {
    if (this.prevAssignee.name === this.committeeMember.name) {
      return true;
    }
    return this.isLoading;
  }

  validateMember() {
    // will return index position of member
    if (this.members) {
      const index = this.members.findIndex(
        (member: any) => member.name === this.committeeMember.name
      );
      this.committeeMember.memberId = this.members[index].memberId;
      return index >= 0;
    }
    return false;
  }

  timeoutAction() {
    setTimeout(() => {
      this.isLoading = false;
      this.dialogRef.close(true);
    }, 2000);
  }

  updateCommitteMember() {
    if (this.validateMember()) {
      this.isLoading = true;
      this.httpService.updateCommitteeMember(this.committeeMember).subscribe(
        (HttpResponse) => {
          this.timeoutAction();
        },
        (HttpError) => {
          console.error(HttpError);
        }
      );
    } else {
      console.warn(`member id didn't match`);
    }
  }

  assignCommitteeMember() {
    if (this.validateMember()) {
      this.isLoading = true;
      this.httpService.assignCommitteeMember(this.committeeMember).subscribe(
        (HttpResponse) => {
          this.timeoutAction();
        },
        (HttpError) => {
          console.error(HttpError);
        }
      );
    }
  }
}
