import { Member } from './member';
import { MemberFormSetting } from './member-form-setting';

export class MemberForm {
  member: Member;
  setting: MemberFormSetting;
  constructor(member = new Member(), setting = new MemberFormSetting()) {
    this.member = member;
    this.setting = setting;
  }
}
