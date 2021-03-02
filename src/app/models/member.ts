import { v4 as uuid } from 'uuid';

export class Member {
  id = uuid();
  householdId: string;
  householdNo: number;
  fullName: string;
  otherName: string;
  birthYear: number = null;
  phone: string;
  gender: string;
}
