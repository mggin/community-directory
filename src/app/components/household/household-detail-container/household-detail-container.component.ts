import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HouseholdDetail } from 'src/app/models/household-detail';
import { Observable } from 'rxjs';
import { ACTIONS } from 'src/app/constant-data';
import { MemberForm } from 'src/app/models/member-form';
import { HouseholdDetailFormSetting } from 'src/app/models/household-detail-form-setting';
import { HouseholdHttpService } from 'src/app/services/http-services/household-http.service';
import { RouteService } from 'src/app/services/route.service';
import { Message } from 'src/app/models/message';
import { finalize } from 'rxjs/operators';
import { ValidationService } from 'src/app/services/validation.service';
import { HouseholdDetailForm } from 'src/app/models/household-detail-form';
import { GroupHttpService } from 'src/app/services/http-services/group-http.service';

@Component({
  selector: 'household-detail-container',
  templateUrl: './household-detail-container.component.html',
  styleUrls: ['./household-detail-container.component.css'],
})
export class HouseholdDetailContainerComponent implements OnInit {
  @Input() memberForms: MemberForm[];
  @Input() householdDetailForm: HouseholdDetailForm;
  @Input() action: string;
  @Output() closeDialog = new EventEmitter();
  householdDetail: HouseholdDetail;
  setting: HouseholdDetailFormSetting;
  disableActions: boolean = false;
  showUpdateProgress: boolean = false;
  showDeleteProgress: boolean = false;
  groupOptions: Observable<any>;
  showEditElements = true;
  message = new Message();
  interval: any;

  constructor(
    private groupHttpService: GroupHttpService,
    private householdHttpService: HouseholdHttpService,
    private routeService: RouteService,
    private validationService: ValidationService
  ) {}
  ngOnInit(): void {
    this.householdDetail = this.householdDetailForm.householdDetail;
    this.setting = this.householdDetailForm.setting;
    // this.becGroupOptions = this.bec.getBecs();
    this.groupOptions = this.groupHttpService.getGroups({
      attributes: ['id', 'groupName'],
    });
    this.showEditElements = this.action === ACTIONS.EDIT;
  }

  resetProgress() {
    if (!this.disableActions) {
      this.message = new Message();
    }
    this.disableActions = !this.disableActions;
    this.showUpdateProgress = false;
    this.showDeleteProgress = false;
  }

  updateHousehold() {
    const householdValidation = this.validationService.HouseholdDetailForm(
      this.householdDetailForm
    );
    this.message = new Message();
    if (householdValidation) {
      this.resetProgress();
      this.showUpdateProgress = true;
      const { id } = this.householdDetail;
      this.householdHttpService
        .updateHousehold(this.householdDetail)
        .pipe(finalize(() => this.resetProgress()))
        .subscribe(
          (HttpResponse) => {
            this.message.success = `Successfully updated.`;
          },
          (HttpError) => {
            this.message.error = HttpError.error.message;
          }
        );
    } else {
      this.message.error = `Please fill out required fields.`
    }
  }

  deleteHousehold() {
    if (confirm(`Are you sure you want to delete this Household?`)) {
      this.resetProgress();
      this.showDeleteProgress = true;
      this.householdHttpService
        .deleteHousehold(this.householdDetail.id)
        .pipe(finalize(() => this.resetProgress()))
        .subscribe(
          (HttpResponse) => {
            this.closeDialog.emit();
            this.routeService.toBoard();
          },
          (HttpError) => {
            this.message.error = HttpError;
          }
        );
    }
  }
}
