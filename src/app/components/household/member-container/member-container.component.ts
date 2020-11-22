import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Member } from 'src/app/models/member';
import {
  ACTIONS
} from 'src/app/constant-data';
import { MemberForm } from 'src/app/models/member-form';
import { MemberFormSetting } from 'src/app/models/member-form-setting';
import { ValidationService } from 'src/app/services/validation.service';
import { OptionsService } from 'src/app/services/options.service';
import { MemberHttpService } from 'src/app/services/http-services/member-http.service';
import { finalize } from 'rxjs/operators';

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
  birthYearOptions: number[] = this.optionsService.getBrithYear();
  genderOptions = this.optionsService.getGender();

  //  MEMBER UPDATE PROPERTIES
  showCreateProgress = false;
  showUpdateProgress = false;
  showDeleteProgress = false;
  errorMessage: string;

  disableActions = false;

  shouldRefreshPage: boolean;

  constructor(
    private memberHttpService: MemberHttpService,
    private validationService: ValidationService,
    private optionsService: OptionsService,
  ) {}

  ngOnInit(): void {
    if (this.action === ACTIONS.CREATE) {
      this.showEditElements = false;
      this.showCreateElements = this.householdId !== undefined;
      this.showRemoveButton = ((this.index !== 0) && this.showCollapse);
    } else if (this.action === ACTIONS.EDIT) {
      this.showCreateElements = false;
    }
  }

  showErrorMessage() {
    return this.setting.requireEthnicName || this.setting.requireGender || this.setting.requirePhone;
  }

  collapseCard(setting: MemberFormSetting) {
    setting.collapse = !setting.collapse;
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
      this.memberHttpService
        .createMember(this.member)
        .pipe(
          finalize(() => {
            this.showCreateProgress = false;
            this.disableActions = false;
            this.closeDialog.emit(this.shouldRefreshPage);
          })
        )
        .subscribe(
          (HttpResponse) => {
            this.shouldRefreshPage = true;
            // this.showCreateError(STATUS_OPTIONS.SUCCESS)
          },
          (HttpError) => {
            this.shouldRefreshPage = false;
            this.errorMessage = `Failed to create the member.`
          },
          () => {}
        );
    }
  }

  deleteMember(id: string) {
    if (confirm('Are you sure you want to delete?')) {
      this.disableActions = true;
      this.showDeleteProgress = true;
      this.memberHttpService
        .deleteMember(id)
        .pipe(
          finalize(() => {
            this.disableActions = false;
            this.showDeleteProgress = false;
            if (this.shouldRefreshPage) {
              this.refreshPage.emit();
            }
          })
        )
        .subscribe(
          (HttpResponse) => {
            this.shouldRefreshPage = true;
          },
          (HttpError) => {
            this.shouldRefreshPage = false;
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

      this.memberHttpService
        .updateMember(this.member.id, this.member)
        .pipe(
          finalize(() => {
            this.disableActions = false;
            this.showUpdateProgress = false;
            if (this.shouldRefreshPage) {
              this.refreshPage.emit();
            }
          })
        )
        .subscribe(
          (HttpResponse) => {
            this.shouldRefreshPage = true;
          },
          (HttpError) => {
            this.shouldRefreshPage = false;
            this.errorMessage =  `Member update failed.`
          }
        );
    }
  }
}
