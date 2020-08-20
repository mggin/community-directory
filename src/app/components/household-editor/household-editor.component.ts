import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Member } from 'src/app/models/member';
import { HouseholdEditorData } from 'src/app/interfaces';
import { Observable, forkJoin } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import {
  MEMBER_ACTIONS,
  STATUS_OPTIONS,
  PROGRESS_TYPES,
} from 'src/app/constant-data';
import { MemberForm } from 'src/app/models/member-form';
import { MemberFormSetting } from 'src/app/models/member-form-setting';
import { ValidationService } from 'src/app/services/validation.service';
import { HouseholdDetailForm } from 'src/app/models/household-detail-form';
import { Router } from '@angular/router';
import { MemberContainerComponent } from '../member-container/member-container.component';

@Component({
  selector: 'app-household-editor',
  templateUrl: './household-editor.component.html',
  styleUrls: ['./household-editor.component.css'],
})
export class HouseholdEditorComponent implements OnInit {
  USER_ACTION = MEMBER_ACTIONS.EDIT;
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
    private httpService: HttpService,
    public dialogRef: MatDialogRef<HouseholdEditorComponent>,
    private validationService: ValidationService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: HouseholdEditorData
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.becGroupOptions = this.httpService.getBecGroupOptions();
    this.queryHousehold(this.data.householdId);
  }

  showElement(setting: MemberFormSetting) {
    return setting.collapse;
  }

  showUpdateError(updateStatusType: string) {
    return updateStatusType === this.updateStatus;
  }

  progressTimout(progressingType: string, statusFunc: Function = () => {}) {
    setTimeout(() => {
      this.disableActions = false;
      statusFunc();
      switch (progressingType) {
        case PROGRESS_TYPES.UPDATE:
          this.isUpdating = false;
          break;
        case PROGRESS_TYPES.DELETE:
          this.isDeleting = false;
          if (this.deleteStatus === STATUS_OPTIONS.SUCCESS) {
            this.dialogRef.close();
          }
          break;
        default:
          break;
      }
    }, 3000);
  }

  updateHouseholdDetail() {
    this.disableActions = true;
    this.isUpdating = true;
    this.updateStatus = undefined;
    const formattedHouseholdDetails = this.validationService.FormatHouseholdDetails(
      this.householdDetailForm.householdDetail
    );
    const params = Object.keys(formattedHouseholdDetails).map((key) => {
      return {
        name: key,
        value: formattedHouseholdDetails[key],
      };
    });
    this.httpService
      .updateHousehold(this.householdDetailForm.householdDetail.id, params)
      .subscribe(
        (HttpResponse) => {
          this.progressTimout(PROGRESS_TYPES.UPDATE, () => {
            this.updateStatus = STATUS_OPTIONS.SUCCESS;
          });
        },
        (HttpError) => {
          this.progressTimout(PROGRESS_TYPES.UPDATE, () => {
            this.updateStatus = STATUS_OPTIONS.FAIL;
          });
        }
      );
  }

  deleteHouseholdDetail() {
    if (confirm('Are you sure you want to delete?')) {
      this.disableActions = true;
      this.isDeleting = true;
      this.deleteStatus = undefined;
      const { id } = this.householdDetailForm.householdDetail;
      this.httpService.deleteHousehold(id).subscribe(
        (HttpResponse) => {
          this.progressTimout(PROGRESS_TYPES.DELETE, () => {
            this.deleteStatus = STATUS_OPTIONS.SUCCESS;
          });
        },
        (HttpError) => {
          this.progressTimout(PROGRESS_TYPES.DELETE, () => {
            this.deleteStatus = STATUS_OPTIONS.FAIL;
          });
        }
      );
    }
  }

  queryHousehold(householdId: string) {
    forkJoin([
      this.httpService.getMembers(householdId),
      this.httpService.getHousehold(householdId),
    ]).subscribe((responses) => {
      this.memberForms = responses[0]['data'].map((_member: Member) => {
        const setting = new MemberFormSetting();
        setting.collapse = false;
        return new MemberForm(_member, setting);
      });
      this.householdDetailForm = new HouseholdDetailForm();
      this.householdDetailForm.householdDetail = responses[1]['data'];
    });
  }

  openMemberCreator() {
    const dialogRef = this.dialog.open(MemberContainerComponent, {
      width: '450px',
      disableClose: true,
    });
    dialogRef.componentInstance.householdId = this.householdDetailForm.householdDetail.id;
    dialogRef.componentInstance.member = new Member();
    dialogRef.componentInstance.setting = new MemberFormSetting();
    dialogRef.componentInstance.action = MEMBER_ACTIONS.CREATE;
    dialogRef.componentInstance.showCollapse = false;
    dialogRef.componentInstance.index = this.memberForms.length + 1;
    dialogRef.componentInstance.closeDialog.subscribe(
      (shouldRefresh: boolean) => {
        dialogRef.close(shouldRefresh);
      }
    );
    dialogRef.afterClosed().subscribe((shouldRefresh: boolean) => {
      if (shouldRefresh) {
        this.loadData();
      }
    });
  }
}
