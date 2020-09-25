import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { HouseholdDetail } from 'src/app/models/household-detail';
import { Member } from 'src/app/models/member';
import {
  MEMBER_ACTIONS,
  HOUSEHOLD_SQL_EXCHANGE,
  MEMBER_SQL_EXCHANGE,
  STATUS_OPTIONS,
} from 'src/app/constant-data';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MemberForm } from 'src/app/models/member-form';
import { MemberFormSetting } from 'src/app/models/member-form-setting';
import { ValidationService } from 'src/app/services/validation.service';
import {
  CreateMemberResopnse,
  CreateHouseholdResponse,
} from 'src/app/interfaces';
import { HouseholdDetailForm } from 'src/app/models/household-detail-form';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-household-creator',
  templateUrl: './household-creator.component.html',
  styleUrls: ['./household-creator.component.css'],
})
export class HouseholdCreatorComponent implements OnInit {
  USER_ACTION = MEMBER_ACTIONS.CREATE;
  householdDetailForm: HouseholdDetailForm;
  memberForms: MemberForm[];
  isCreatingHousehold = false;
  disableActions = false;
  constructor(
    private dialogRef: MatDialogRef<HouseholdCreatorComponent>,
    private httpService: HttpService,
    private validateService: ValidationService,
    private routeService: RouteService,
  ) {}
  ngOnInit(): void {
    this.householdDetailForm = new HouseholdDetailForm();
    this.memberForms = [new MemberForm()];
  }

  collapseCard(memberForm: MemberForm) {
    memberForm.setting.collapse = !memberForm.setting.collapse;
  }

  addMember() {
    if (this.memberForms.length <= 20) {
      this.memberForms.push(new MemberForm());
    } else {
      alert(
        "You can't add more than 20 members. Contact Developer for more detail."
      );
    }
  }

  showElement(setting: MemberFormSetting) {
    return setting.collapse;
  }

  removeLocalMember(index: number) {
    if (confirm('Are you sure you want to remove?')) {
      this.memberForms = this.memberForms.filter(
        (member, _index) => _index !== index
      );
    }
  }

  stopCreatingProgress(statusType: string = STATUS_OPTIONS.FAIL) {
    setTimeout(() => {
      this.disableActions = false;
      this.isCreatingHousehold = false;
      if (statusType === STATUS_OPTIONS.SUCCESS) {
        this.dialogRef.close();
      }
    }, 3000);
  }

  closeDialog() {
    this.dialogRef.close();
    this.routeService.toBoard();
  }

  createHousehold() {
    const memberValidation = this.validateService.MemberForm(this.memberForms);
    const householdValidation = this.validateService.HouseholdDetailForm(this.householdDetailForm);
    if (memberValidation && householdValidation) {
      this.disableActions = true;
      this.isCreatingHousehold = true;
      // Convert to SQL Format
      const formattedHouseholdDetails = this.validateService.FormatHouseholdDetails(
        this.householdDetailForm.householdDetail
      );
      // Creating Household Id, return householder uuid & inserted id
      this.httpService.createHousehold(formattedHouseholdDetails).subscribe(
        (HttpResponse: CreateHouseholdResponse) => {
          const { householderUUID, householdId } = HttpResponse;
          const members = [];
          for (const [index, memberForm] of this.memberForms.entries()) {
            const { member } = memberForm;
            member.householdId = householdId;
            member.householdNo = index + 1;
            // Format Member ke to SQL column format.
            const formattedMember = this.validateService.FormatMember(member);
            members.push(formattedMember);
          }
          this.httpService.createMembers(members).subscribe(
            (HttpResponse: CreateMemberResopnse) => {
              const filteredMembers = HttpResponse.createdMembers
                .filter((createdMember) => {
                  return createdMember.uuid === householderUUID;
                })
                .map((createdMember) => createdMember.insertedId);
              if (filteredMembers.length > 0) {
                // UPDATE HOUSEHOLD DETAILS
                const params = [
                  {
                    name: 'householder_id',
                    value: filteredMembers[0],
                  },
                ];
                this.httpService.updateHousehold(householdId, params).subscribe(
                  (HttpResponse) => {
                    this.stopCreatingProgress(STATUS_OPTIONS.SUCCESS);
                  },
                  (HttpError) => {
                    this.stopCreatingProgress();
                  }
                );
              } else {
                this.stopCreatingProgress();
              }
            },
            (HttpError) => {
              this.stopCreatingProgress();
            }
          );
        },
        (HttpError) => {
          this.stopCreatingProgress();
        }
      );
    }
  }
}
