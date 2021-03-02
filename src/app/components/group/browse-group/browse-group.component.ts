import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { GroupHttpService } from 'src/app/services/http-services/group-http.service';
import { HouseholdHttpService } from 'src/app/services/http-services/household-http.service';
import { RouteService } from 'src/app/services/route.service';
import { ManageGroupComponent } from '../manage-group/manage-group.component';

@Component({
  selector: 'app-browse-group',
  templateUrl: './browse-group.component.html',
  styleUrls: ['./browse-group.component.css'],
})
export class BrowseGroupComponent implements OnInit {
  groups: any;
  households: any;
  selectedGroup: any;
  constructor(
    private groupHttpService: GroupHttpService,
    private householdHttpService: HouseholdHttpService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<BrowseGroupComponent>,
    private routeService: RouteService,
  ) {}

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups() {
    this.groupHttpService
      .getGroups()
      .pipe(
        finalize(() => {
          this.getHouseholds();
        })
      )
      .subscribe((HttpResponse) => {
        this.groups = HttpResponse;
        this.selectedGroup = JSON.parse(JSON.stringify(this.groups[0]));
      });
  }

  groupOnChanged(event: any) {
    const id = event.target.value;
    const index = this.groups.findIndex((group) => group.id == id);
    if (index >= 0) {
      this.selectedGroup = JSON.parse(JSON.stringify(this.groups[index]));
      this.getHouseholds();
    }
  }
  getHouseholds() {
    this.households = this.householdHttpService.getHouseholds({
      groupId: this.selectedGroup.id,
    });
  }

  routeToEditPage(householdId: string) {
    window.open(`/board/edit?householdId=${householdId}`);
  }

  openGroupManager() {
    const dialogRef = this.dialog.open(ManageGroupComponent, {
      width: '60vw',
      disableClose: true,
    });
  }

  closeDialog() {
    this.dialogRef.close();
    this.routeService.toBoard();
  }
}
