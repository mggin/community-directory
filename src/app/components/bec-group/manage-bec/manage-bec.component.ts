import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Observable } from 'rxjs';
import { BecName, BecNames } from 'src/app/interfaces';
import { BEC_COLUMNS } from 'src/app/constant-data';
import { RouteService } from 'src/app/services/route.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-bec',
  templateUrl: './manage-bec.component.html',
  styleUrls: ['./manage-bec.component.css'],
})
export class ManageBecComponent implements OnInit {
  becs: BecNames;
  selectedBecId: string;
  becsDetail: any;
  keys: string[];
  becColumns: string[];
  constructor(
    private httpService: HttpService,
    private routeService: RouteService,
    private dialogRef: MatDialogRef<ManageBecComponent>
  ) {}

  ngOnInit(): void {
    this.httpService.getBECs().subscribe(
      (HttpResponse: BecNames) => {
        this.becs = HttpResponse;
        if (this.becs.length > 0) {
          this.selectedBecId = this.becs[1].id;
        }
      },
      (HttpError) => {},
      () => {
        this.hanldeOnChange();
      }
    );
  }

  hanldeOnChange() {
    this.httpService.getBECsDetails(this.selectedBecId).subscribe(
      (HttpResponse) => {
        this.becsDetail = HttpResponse;
        if (this.becsDetail) {
          this.keys = Object.keys(this.becsDetail[0]);
          this.becColumns = this.keys
            .filter((key) => key !== 'hasRole')
            .map((key) => BEC_COLUMNS[key] || '');
          console.log(this.becColumns);
        }
        console.log(this.becColumns);
      },
      (HttpError) => {
        console.log(HttpError);
      }
    );
  }

  handleAssignRole(event: any, role: string, ) {
    let roleParam: string;
    if (role === 'leader') {
       roleParam = 'leader_id';
    } else if (role === 'assistant') {
       roleParam = 'assistant_id';
    }
    if (confirm(`Are you sure you want to change the ${role}?`)) {
      const memberId = event.target.value;
      console.log(memberId);
      this.httpService
        .assignBecRole(this.selectedBecId, memberId, roleParam)
        .subscribe(
          (HttpResponse) => {
            console.log(HttpResponse);
          },
          (HttpError) => {
            console.error(HttpError);
          }, () => {
            this.hanldeOnChange();
          }
        );
    }
  }

  closeDialog() {
    this.dialogRef.close();
    this.routeService.toBoard();
  }
}
