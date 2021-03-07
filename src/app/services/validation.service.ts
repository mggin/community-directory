import { Injectable } from '@angular/core';
import { MemberForm } from '../models/member-form';
import { HouseholdDetailForm } from '../models/household-detail-form';
import { AuthHttpService } from './http-services/auth-http.service';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private authHttpService: AuthHttpService) {}

  validateSession = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      try {
        this.authHttpService.valideSession().subscribe(
          (HttpResponse) => {
            resolve(true);
          },
          (HttpError) => {
            resolve(false);
          }
        );
      } catch (error) {
        resolve(error);
      }
    });
  };

  MemberForm(memberForms: MemberForm[]) {
    for (const memberForm of memberForms) {
      const { fullName, gender, phone } = memberForm.member;
      // if (!ethnicName || ethnicName.length < 1) {
      memberForm.setting.requireFullName = !fullName || fullName.length < 1;
      if (phone) {
        memberForm.setting.requirePhone = !(
          phone.length <= 12 && phone.length >= 10
        );
      } else {
        memberForm.setting.requirePhone = false;
      }
      memberForm.setting.requireGender = !gender;
    }
    return memberForms.every((memberForm) => {
      return (
        !memberForm.setting.requireFullName &&
        !memberForm.setting.requireGender &&
        !memberForm.setting.requirePhone
      );
    });
  }

  HouseholdDetailForm(householdDetailForm: HouseholdDetailForm) {
    console.log(householdDetailForm.householdDetail);
    const {
      householderId,
      primaryPhone,
      secondaryPhone,
    } = householdDetailForm.householdDetail;
    householdDetailForm.setting.requireHouseholderId = !householderId;
    if (primaryPhone) {
      householdDetailForm.setting.requirePrimaryPhone = !(
        primaryPhone.length >= 10 && primaryPhone.length <= 12
      );
    }
    if (secondaryPhone) {
      householdDetailForm.setting.requireSecondaryPhone = !(
        secondaryPhone.length >= 10 && secondaryPhone.length <= 12
      );
    }
    return (
      !householdDetailForm.setting.requireHouseholderId &&
      !householdDetailForm.setting.requirePrimaryPhone &&
      !householdDetailForm.setting.requireSecondaryPhone
    );
  }
}
