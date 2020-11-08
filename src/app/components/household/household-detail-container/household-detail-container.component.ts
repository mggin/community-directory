import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HouseholdDetail } from 'src/app/models/household-detail';
import { Observable } from 'rxjs';
import { ACTIONS } from 'src/app/constant-data';
import { MemberForm } from 'src/app/models/member-form';
import { HouseholdDetailFormSetting } from 'src/app/models/household-detail-form-setting';
import { BecsHttpService } from 'src/app/services/http-services/becs-http.service';
import { HouseholdHttpService } from 'src/app/services/http-services/household-http.service';
import { RouteService } from 'src/app/services/route.service';
import { Message } from 'src/app/models/message';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'household-detail-container',
  templateUrl: './household-detail-container.component.html',
  styleUrls: ['./household-detail-container.component.css'],
})
export class HouseholdDetailContainerComponent implements OnInit {
  @Input() householdDetail: HouseholdDetail;
  @Input() memberForms: MemberForm[];
  @Input() setting: HouseholdDetailFormSetting;
  @Input() action: string;
  @Output() closeDialog = new EventEmitter();
  disableActions: boolean = false;
  showUpdateProgress: boolean = false;
  showDeleteProgress: boolean = false;
  becGroupOptions: Observable<any>;
  showEditElements = true;
  message = new Message();
  interval: any;
  constructor(
    private becsHttpSvc: BecsHttpService,
    private householdHttpService: HouseholdHttpService,
    private routeService: RouteService
  ) {}
  ngOnInit(): void {
    this.becGroupOptions = this.becsHttpSvc.getBecs();
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
    this.resetProgress();
    this.showUpdateProgress = true;
    const { id } = this.householdDetail;
    this.householdHttpService
      .updateHousehold(id, this.householdDetail)
      .pipe(finalize(() => this.resetProgress()))
      .subscribe(
        (HttpResponse) => {
          this.message.success = `Successfully updated.`
        },
        (HttpError) => {
          this.message.error = HttpError
        }
      );
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
            this.message.error = HttpError
          }
        );
    }
  }
}
