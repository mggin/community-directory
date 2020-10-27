import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Member } from 'src/app/models/member';
import { Observable } from 'rxjs';
import {
  ACTIONS,
  STATUS_OPTIONS
} from 'src/app/constant-data';
import { MemberForm } from 'src/app/models/member-form';
import { MemberFormSetting } from 'src/app/models/member-form-setting';
import { HouseholdDetailForm } from 'src/app/models/household-detail-form';
import { Router } from '@angular/router';
import { MemberContainerComponent } from '../member-container/member-container.component';
import { RouteService } from 'src/app/services/route.service';
import { HouseholdHttpService } from 'src/app/services/http-services/household-http.service';
import { HouseholdInfoProps } from 'src/app/interfaces';

@Component({
  selector: 'app-household-editor',
  templateUrl: './household-editor.component.html',
  styleUrls: ['./household-editor.component.css'],
})
export class HouseholdEditorComponent implements OnInit {
  householdId: string;
  ACTION = ACTIONS.EDIT;
  memberForms: MemberForm[];
  householdDetailForm: HouseholdDetailForm;
  becGroupOptions: Observable<string[]>;
  isUpdating = false;
  isDeleting = false;
  disableActions = false;
  statusOptions = STATUS_OPTIONS;
  updateStatus: string;
  deleteStatus: string;
  showDeleteError = false;
  constructor(
    public dialogRef: MatDialogRef<HouseholdEditorComponent>,
    private householdHttpService: HouseholdHttpService,
    private dialog: MatDialog,
    private routeService: RouteService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {

  }

  ngOnInit(): void {
    this.householdId = this.data.householdId;
    this.queryHouseholdInfo();
  }

  loadData(householdInfo: HouseholdInfoProps) {
    const { members, householdDetail } = JSON.parse(JSON.stringify(householdInfo));
    this.memberForms = members.map((_member: Member) => {
      const setting = new MemberFormSetting();
      setting.collapse = false;
      return new MemberForm(_member, setting);
    });
    this.householdDetailForm = new HouseholdDetailForm();
    this.householdDetailForm.householdDetail = householdDetail;
  }

  queryHouseholdInfo() {
    this.householdHttpService.getHouseholdInfo(this.householdId).subscribe(
      (HttpResponse: HouseholdInfoProps) => {
        this.loadData(HttpResponse);
      }
    );
  }

  showElement(setting: MemberFormSetting) {
    return setting.collapse;
  }

  showUpdateError(updateStatusType: string) {
    return updateStatusType === this.updateStatus;
  }

  closeDialog() {
    this.dialogRef.close();
    this.routeService.toBoard(this.householdId)
  }

  openMemberCreator() {
    const dialogRef = this.dialog.open(MemberContainerComponent, {
      width: '450px',
      disableClose: true,
    });
    dialogRef.componentInstance.householdId = this.householdDetailForm.householdDetail.id;
    dialogRef.componentInstance.member = new Member();
    dialogRef.componentInstance.setting = new MemberFormSetting();
    dialogRef.componentInstance.action = ACTIONS.CREATE;
    dialogRef.componentInstance.showCollapse = false;
    dialogRef.componentInstance.index = this.memberForms.length + 1;
    dialogRef.componentInstance.closeDialog.subscribe(
      (shouldRefresh: boolean) => {
        dialogRef.close(shouldRefresh);
      }
    );
    dialogRef.afterClosed().subscribe((shouldRefresh: boolean) => {
      if (shouldRefresh) {
        this.queryHouseholdInfo();
      }
    });
  }
}
