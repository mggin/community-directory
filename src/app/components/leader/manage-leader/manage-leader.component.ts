import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ACTIONS } from 'src/app/constant-data';
import { LeaderProps } from 'src/app/interfaces';
import { Leader } from 'src/app/models/leader';
import { LeaderHttpService } from 'src/app/services/http-services/leader-http.service';
import { RouteService } from 'src/app/services/route.service';
import { AssignLeaderComponent } from '../assign-leader/assign-leader.component';

@Component({
  selector: 'manage-leader',
  templateUrl: './manage-leader.component.html',
})
export class ManageLeaderComponent implements OnInit {
  leaders: any;
  ACTIONS = ACTIONS;
  constructor(
    private leaderHttpService: LeaderHttpService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ManageLeaderComponent>,
    private routeService: RouteService,
  ) {}

  ngOnInit(): void {
    this.getLeaders();
  }

  getLeaders() {
    this.leaderHttpService.getLeaders().subscribe((HttpResponse) => {
      this.leaders = HttpResponse;
    }, (HttpError) => {
      console.log(HttpError)
    })
  }

  openAssignLeader(action: string, _leader: Partial<LeaderProps> = undefined) {
    let leader: Leader = new Leader();
    if (action === ACTIONS.EDIT) {
       const { id, memberId, role, name } = _leader;
       leader.set(id, memberId, role, name);
    }
    const dialogRef = this.dialog.open(AssignLeaderComponent, {
      data: { leader, action }
    });


    dialogRef.afterClosed().subscribe((shouldUpdate) => {
      if (shouldUpdate) {
        this.getLeaders();
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
    this.routeService.toBoard();
  }
}
