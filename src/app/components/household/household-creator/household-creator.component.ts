import { Component, OnInit } from '@angular/core';
import {
  ACTIONS
} from 'src/app/constant-data';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MemberForm } from 'src/app/models/member-form';
import { MemberFormSetting } from 'src/app/models/member-form-setting';
import { ValidationService } from 'src/app/services/validation.service';
import { HouseholdDetailForm } from 'src/app/models/household-detail-form';
import { RouteService } from 'src/app/services/route.service';
import { HouseholdHttpService } from 'src/app/services/http-services/household-http.service';
import { MemberHttpService } from 'src/app/services/http-services/member-http.service';
import { HouseholdProps, MemberProps } from 'src/app/interfaces';

@Component({
  selector: 'app-household-creator',
  templateUrl: './household-creator.component.html',
  styleUrls: ['./household-creator.component.css'],
})
export class HouseholdCreatorComponent implements OnInit {
  ACTION = ACTIONS.CREATE;
  householdDetailForm: HouseholdDetailForm;
  memberForms: MemberForm[];
  disableActions = false;
  errorMessage: string;
  constructor(
    private dialogRef: MatDialogRef<HouseholdCreatorComponent>,
    private householdHttpService: HouseholdHttpService,
    private memberHttpService: MemberHttpService,
    private validateService: ValidationService,
    private routeService: RouteService
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

  closeDialog(householdId: string = undefined) {
    this.routeService.toBoard(householdId);
    this.dialogRef.close();
  }

  createMember(member: Partial<MemberProps>): Promise<string> {
    return new Promise((resolve, reject) => {
      this.memberHttpService.createMember(member).subscribe(
        (HttpResponse: Partial<MemberProps>) => {
          const { memberId } = HttpResponse;
          resolve(memberId);
          console.info(HttpResponse);
        },
        (HttpError) => {
          reject(HttpError);
          console.error(HttpError);
        }
      );
    });
  }

  updateHouseholder(props: Partial<HouseholdProps>) {
    return new Promise((resolve, reject) => {
      this.householdHttpService.updateHouseholder(props).subscribe(
        (HttpResponse) => {
          console.log(HttpResponse);
          resolve(HttpResponse);
        },
        (HttpError) => {
          console.error(HttpError);
          reject(HttpError);
        }
      );
    });
  }

  handleError() {
    this.errorMessage = `Web service error occured.`;
    this.disableActions = false;
  }

  createHousehold() {
    const memberValidation = this.validateService.MemberForm(this.memberForms);
    const householdValidation = this.validateService.HouseholdDetailForm(
      this.householdDetailForm
    );
    if (memberValidation && householdValidation) {
      this.errorMessage = undefined;
      this.disableActions = true;
      const { householdDetail } = this.householdDetailForm;
      this.householdHttpService.createHousehold(householdDetail).subscribe(
        async (HttpResponse: Partial<HouseholdProps>) => {
          const { householdId } = HttpResponse;
          for (const [index, memberForm] of this.memberForms.entries()) {
            const { member } = memberForm;
            member.householdId = householdId;
            member.householdNo = index + 1;
            try {
              const memberId = await this.createMember(member);
              if (member.id === householdDetail.householderId) {
                await this.updateHouseholder({
                  householdId,
                  householderId: memberId,
                });
              }
            } catch (error) {
              this.handleError();
              this.householdHttpService.deleteHousehold(householdId).subscribe();
              throw error;
            } 
          }
          this.disableActions = false;
          this.closeDialog(householdId);
        },
        (HttpError) => {
          this.handleError();
          throw HttpError;
        }
      );
    }
  }
}
