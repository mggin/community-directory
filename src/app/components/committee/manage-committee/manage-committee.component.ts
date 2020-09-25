import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { COMMITTEE_ACTIONS } from 'src/app/constant-data';
import { CommitteeMember } from 'src/app/models/committee-member';
import { HttpService } from 'src/app/services/http.service';
import { RouteService } from 'src/app/services/route.service';
import { AssignCommitteeComponent } from '../assign-committee/assign-committee.component';

@Component({
  selector: 'app-manage-committee',
  templateUrl: './manage-committee.component.html',
})
export class ManageCommitteeComponent implements OnInit {
  committeeMembers: any;
  COMMITTEE_ACTIONS = COMMITTEE_ACTIONS;
  constructor(
    private httpService: HttpService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ManageCommitteeComponent>,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {
    this.getCommitteeMembers();
  }

  getCommitteeMembers() {
    this.httpService.getCommitteeMembers().subscribe(
      (HttpResponse) => {
        console.log(HttpResponse);
        this.committeeMembers = HttpResponse;
      },
      (HttpError) => {
        console.error(HttpError);
      }
    );
  }

  openEditor(action: string, committeeMember: CommitteeMember = undefined) {
    const dialogRef = this.dialog.open(AssignCommitteeComponent);
    dialogRef.componentInstance.action = action;
    if (action === COMMITTEE_ACTIONS.CREATE) {
      dialogRef.componentInstance.committeeMember = new CommitteeMember();
    } else if (action === COMMITTEE_ACTIONS.EDIT) {
      dialogRef.componentInstance.committeeMember = JSON.parse(
        JSON.stringify(committeeMember)
      );
    }

    dialogRef.afterClosed().subscribe((wasUpated) => {
      if (wasUpated) {
        this.getCommitteeMembers();
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
    this.routeService.toBoard();
  }
}
