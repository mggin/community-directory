import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Leader } from 'src/app/models/leader';
import { LeaderHttpService } from 'src/app/services/http-services/leader-http.service';
import { RouteService } from 'src/app/services/route.service';
import { LeaderFormComponent } from '../leader-form/leader-form.component';

@Component({
  selector: 'manage-leader',
  templateUrl: './manage-leader.component.html',
})
export class ManageLeaderComponent implements OnInit {
  leaders$: any;
  constructor(
    private leaderHttpService: LeaderHttpService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ManageLeaderComponent>,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {
    this.getLeaders();
  }

  getLeaders() {
    this.leaders$ = this.leaderHttpService.getLeaders();
  }

  openLeaderForm(action: string, selectedLeader: any = {}) {
    const dialogRef = this.dialog.open(LeaderFormComponent, {
      width: '20vw',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result['shouldRefresh']) {
        this.getLeaders();
      }
    });
    const { fullName, otherName, memberId, id, role } = selectedLeader;
    const props = id
      ? {
          role,
          memberId,
          id,
          name: `${fullName}${otherName ? ', ' + otherName : ''}`,
        }
      : {};
    dialogRef.componentInstance.action = action;
    dialogRef.componentInstance.leader = new Leader(props);
  }

  deleteLeader(leaderId: string) {
    if (confirm(`Are you sure you want to delete?`)) {
      this.leaderHttpService
        .deleteLeader(leaderId)
        .subscribe((HttpResponse) => {
          this.getLeaders();
        });
    }
  }

  closeDialog() {
    this.dialogRef.close();
    this.routeService.toBoard();
  }
}
