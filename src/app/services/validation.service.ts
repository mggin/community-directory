import { Injectable } from '@angular/core';
import { MemberForm } from '../models/member-form';
import { HouseholdDetail } from '../models/household-detail';
// import { HOUSEHOLD_SQL_EXCHANGE, MEMBER_SQL_EXCHANGE } from '../constant-data';
import { Member } from '../models/member';
import { HouseholdDetailForm } from '../models/household-detail-form';
import { decode } from 'punycode';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  DecodeToken(token: string) {
    const payload = window.atob(token.split('.')[1]);
    const decodedToken = JSON.parse(payload);
    return decodedToken;
  }

  GetCommunityId() {
    return localStorage.getItem('communityId')||''
  }

  validateToken(): boolean {
    const token = localStorage.getItem('accessToken');
    return ( token && (this.DecodeToken(token).exp > ( Date.now() / 1000 )))
  }

  MemberForm(memberForms: MemberForm[]) {
    for (const memberForm of memberForms) {
      const { ethnicName, gender, phone } = memberForm.member;
      // if (!ethnicName || ethnicName.length < 1) {
      memberForm.setting.requireEthnicName = !ethnicName || ethnicName.length < 1;
      if (phone) {
        memberForm.setting.requirePhone = !(phone.length <= 12 && phone.length >= 10)
        console.log('inn')
      } else {
        memberForm.setting.requirePhone = false;
      }
      console.log(memberForm.setting)
      // } else if (ethnicName) {
      //   memberForm.setting.requireEthnicName = false;
      // }
      // if (!gender) {
      //   memberForm.setting.requireGender = true;
      // } else if (gender) {
      memberForm.setting.requireGender = !gender
      // }
      // if ()
    }
    return memberForms.every((memberForm) => {
      return (
        !memberForm.setting.requireEthnicName &&
        !memberForm.setting.requireGender &&
        !memberForm.setting.requirePhone
      );
    });
  }

  HouseholdDetailForm(householdDetailForm: HouseholdDetailForm) {
    console.log(householdDetailForm.householdDetail)
    const { householderId, becId, primaryPhone, secondaryPhone } = householdDetailForm.householdDetail;
    householdDetailForm.setting.requireHouseholderId = !householderId;
    householdDetailForm.setting.requireBecGroup = !becId;
    householdDetailForm.setting.requirePrimaryPhone = false;
    householdDetailForm.setting.requireSecondaryPhone = false;
    if (primaryPhone) {
      householdDetailForm.setting.requirePrimaryPhone =  !(primaryPhone.length >= 10 && primaryPhone.length <= 12)
    }
    if (secondaryPhone) {
      householdDetailForm.setting.requireSecondaryPhone =  !(secondaryPhone.length >= 10 && secondaryPhone.length <= 12)
    } 
    return (
      !householdDetailForm.setting.requireHouseholderId &&
      !householdDetailForm.setting.requireBecGroup && 
      !householdDetailForm.setting.requirePrimaryPhone &&
      !householdDetailForm.setting.requireSecondaryPhone
    );
  }

  // FormatHouseholdDetails(_householdDetail: HouseholdDetail) {
  //   const householdDetails = {};
  //   Object.keys(_householdDetail).forEach((key) => {
  //     if (HOUSEHOLD_SQL_EXCHANGE[key]) {
  //       householdDetails[HOUSEHOLD_SQL_EXCHANGE[key]] = _householdDetail[key];
  //     }
  //   });
  //   return householdDetails;
  // }

  // FormatMember(_member: Member) {
  //   const member = {};
  //   Object.keys(_member).forEach((key) => {
  //     if (MEMBER_SQL_EXCHANGE[key]) {
  //       member[MEMBER_SQL_EXCHANGE[key]] = _member[key];
  //     }
  //   });
  //   return member;
  // }
}
