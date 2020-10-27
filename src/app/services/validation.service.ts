import { Injectable } from '@angular/core';
import { MemberForm } from '../models/member-form';
import { HouseholdDetail } from '../models/household-detail';
import { HOUSEHOLD_SQL_EXCHANGE, MEMBER_SQL_EXCHANGE } from '../constant-data';
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
  MemberForm(memberForms: MemberForm[]) {
    for (const memberForm of memberForms) {
      const { ethnicName, gender } = memberForm.member;
      if (!ethnicName || ethnicName.length < 1) {
        memberForm.setting.requireEthnicName = true;
      } else if (ethnicName) {
        memberForm.setting.requireEthnicName = false;
      }
      if (!gender) {
        memberForm.setting.requireGender = true;
      } else if (gender) {
        memberForm.setting.requireGender = false;
      }
    }
    return memberForms.every((memberForm) => {
      return (
        !memberForm.setting.requireEthnicName &&
        !memberForm.setting.requireGender
      );
    });
  }

  HouseholdDetailForm(householdDetailForm: HouseholdDetailForm) {
    console.log(householdDetailForm.householdDetail)
    if (!householdDetailForm.householdDetail.householderId) {
      householdDetailForm.setting.requireHouseholderId = true;
    } else {
      householdDetailForm.setting.requireHouseholderId = false;
    }
    if (!householdDetailForm.householdDetail.becId) {
      householdDetailForm.setting.requireBecGroup = true;
    } else {
      householdDetailForm.setting.requireBecGroup = false;
    }
    return (
      !householdDetailForm.setting.requireHouseholderId &&
      !householdDetailForm.setting.requireBecGroup
    );
  }

  FormatHouseholdDetails(_householdDetail: HouseholdDetail) {
    const householdDetails = {};
    Object.keys(_householdDetail).forEach((key) => {
      if (HOUSEHOLD_SQL_EXCHANGE[key]) {
        householdDetails[HOUSEHOLD_SQL_EXCHANGE[key]] = _householdDetail[key];
      }
    });
    return householdDetails;
  }

  FormatMember(_member: Member) {
    const member = {};
    Object.keys(_member).forEach((key) => {
      if (MEMBER_SQL_EXCHANGE[key]) {
        member[MEMBER_SQL_EXCHANGE[key]] = _member[key];
      }
    });
    return member;
  }
}
