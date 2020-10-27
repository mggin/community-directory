import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { MatDialogRef } from '@angular/material/dialog';
import { BecsHttpService } from 'src/app/services/http-services/becs-http.service';
import { BecProps } from 'src/app/interfaces';

@Component({
  selector: 'app-manage-bec',
  templateUrl: './manage-bec.component.html',
  styleUrls: ['./manage-bec.component.css'],
})
export class ManageBecComponent implements OnInit {
  becs: Partial<BecProps>[];
  bec: Partial<BecProps>;
  becsDetail: any;
  keys: string[];
  becColumns: string[];
  errorMessage: string;
  selectedBecId: string;
  constructor(
    private becHttpService: BecsHttpService,
    private routeService: RouteService,
    private dialogRef: MatDialogRef<ManageBecComponent>
  ) {}

  ngOnInit(): void {
    this.initPage();
  }

  initPage(previousBecId: string = undefined) {
    this.becHttpService.getBecs().subscribe(
      (HttpResponse: Partial<BecProps>[]) => {
        this.becs = HttpResponse;
        if (this.becs.length > 0) {
          let index: number;
          if (previousBecId) {
            index = this.becs.findIndex(bec => bec.id == previousBecId);
          } else {
            index = 0;
          }
          this.bec = this.becs[index];
          this.selectedBecId = this.bec.id;
        }
      },
      (HttpError) => {},
      () => {
        this.setBecDetails();
      }
    );
  }

  hanldeOnChange(event: any) {
    this.selectedBecId = event.target.value;
    const index = this.becs.findIndex(bec => bec.id == this.selectedBecId);
    this.bec = this.becs[index]
    this.setBecDetails();
  }

  setBecDetails() {
    this.becsDetail = this.becHttpService.getBecDetails(this.selectedBecId);
  }

  updateLeaderRole(event: any) {
    if (confirm(`Are you sure you want to update the B.E.C Leader?`)) {
      const leaderId = event.target.value;
      console.log(this.bec)
      this.becHttpService.updateBecLeader(this.bec.id, { leaderId }).subscribe(
        (HttpResponse) => {
          this.errorMessage = undefined;
          this.initPage(this.bec.id);
        },
        (HttpError) => {
          this.errorMessage = HttpError;
        }
      );
    }
  }

  updateAssistantRole(event: any) {
    if (confirm(`Are you sure you want to update the B.E.C Assistant?`)) {
      const assistantId = event.target.value;
      this.becHttpService.updateBecAssistant(this.bec.id, { assistantId }).subscribe(
        (HttpResponse) => {
          this.errorMessage = undefined;
          this.initPage(this.bec.id);
        },
        (HttpError) => {
          this.errorMessage = HttpError;
        }
      );
    }
  }

  routeToEditPage(householdId: string) {
    window.open(`/board/edit?householdId=${householdId}`)
  }

  closeDialog() {
    this.dialogRef.close();
    this.routeService.toBoard();
  }
}
