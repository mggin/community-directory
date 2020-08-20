import { v4 as uuid } from 'uuid';

export class Member {
  id = uuid();
  householdId: string;
  householdNo: number;
  christianName: string;
  ethnicName: string;
  nickName: string;
  birthYear: number;
  phone: string;
  gender: string;
}
