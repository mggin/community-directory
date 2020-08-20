import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Member } from 'src/app/models/member';
import {
  MEMBER_ACTIONS,
  MEMBER_SQL_EXCHANGE,
  PROGRESS_TYPES,
  GENDER_OPTIONS,
  STATUS_OPTIONS,
} from 'src/app/constant-data';
import { MemberForm } from 'src/app/models/member-form';
import { MemberFormSetting } from 'src/app/models/member-form-setting';
import { HttpService } from 'src/app/services/http.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'member-container',
  templateUrl: './member-container.component.html',
  styleUrls: ['./member-container.component.css'],
})
export class MemberContainerComponent implements OnInit {
  @Input() action: string;
  @Input() setting: MemberFormSetting;
  @Input() member: Member;
  @Input() index: number;
  @Input() householdId: string;
  @Input() showCollapse = true;
  @Output() removeLocalMember = new EventEmitter();
  @Output() refreshPage = new EventEmitter();
  @Output() closeDialog = new EventEmitter();
  showEditElements = true;
  showCreateElements = true;
  showRemoveButton = false;
  birthYearOptions: number[];

  //  MEMBER UPDATE PROPERTIES
  showCreateProgress = false;
  showUpdateProgress = false;
  showDeleteProgress = false;
  createStatus: string;
  updateStatus: string;
  deleteStatus: string;
  disableActions = false;
  genderOptions = GENDER_OPTIONS;
  statusOptions = STATUS_OPTIONS;

  constructor(
    private httpService: HttpService,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.birthYearOptions = Array(100)
      .fill(null)
      .map((_null, index) => {
        return currentYear - index;
      });
    if (this.action === MEMBER_ACTIONS.CREATE) {
      this.showEditElements = false;
      if (!this.showCollapse) {
        this.showRemoveButton = false;
      } else {
        if (this.index !== 0) {
          this.showRemoveButton = true;
        }
      }
    } else if (this.action === MEMBER_ACTIONS.EDIT) {
      this.showCreateElements = false;
    }
  }

  showErrorMessage() {
    return this.setting.requireEthnicName || this.setting.requireGender;
  }

  showUpdateError(updateStatusType: string) {
    return updateStatusType === this.updateStatus;
  }

  showCreateError(createStatusType: string) {
    return createStatusType === this.createStatus;
  }

  collapseCard(setting: MemberFormSetting) {
    setting.collapse = !setting.collapse;
  }

  progressTimout(progressingType: string, statusFunc: Function = () => {}) {
    setTimeout(() => {
      this.disableActions = false;
      statusFunc();
      switch (progressingType) {
        case PROGRESS_TYPES.CREATE:
          this.showCreateProgress = false;
          if (this.createStatus === STATUS_OPTIONS.SUCCESS) {
            const shouldRefresh = true;
            this.closeDialog.emit(shouldRefresh);
          }
          break;
        case PROGRESS_TYPES.UPDATE:
          this.showUpdateProgress = false;
          break;
        case PROGRESS_TYPES.DELETE:
          this.showDeleteProgress = false;
          if (this.deleteStatus === STATUS_OPTIONS.SUCCESS) {
            this.refreshPage.emit();
          }
          break;
        default:
          break;
      }
    }, 3000);
  }

  createMember() {
    if (
      this.validationService.MemberForm([
        new MemberForm(this.member, this.setting),
      ])
    ) {
      this.disableActions = true;
      this.showCreateProgress = true;
      this.member.householdId = this.householdId;
      this.member.householdNo = this.index;
      const formattedMember = this.validationService.FormatMember(this.member);
      this.httpService.createMembers([formattedMember]).subscribe(
        (HttpResponse) => {
          this.progressTimout(PROGRESS_TYPES.CREATE, () => {
            this.createStatus = STATUS_OPTIONS.SUCCESS;
          });
        },
        (HttpError) => {
          this.progressTimout(PROGRESS_TYPES.CREATE, () => {
            this.createStatus = STATUS_OPTIONS.FAIL;
          });
        }
      );
    }
  }

  deleteMember(id: string) {
    if (confirm('Are you sure you want to delete?')) {
      this.disableActions = true;
      this.showDeleteProgress = true;
      this.deleteStatus = undefined;
      this.httpService.deleteMember(id).subscribe(
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

  updateMember() {
    if (
      this.validationService.MemberForm([
        new MemberForm(this.member, this.setting),
      ])
    ) {
      this.disableActions = true;
      this.showUpdateProgress = true;
      this.updateStatus = undefined;
      const member = {};
      Object.keys(this.member).forEach((key) => {
        if (MEMBER_SQL_EXCHANGE[key]) {
          member[MEMBER_SQL_EXCHANGE[key]] = this.member[key];
        }
      });
      this.httpService.updateMember(this.member.id, member).subscribe(
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
  }
}
