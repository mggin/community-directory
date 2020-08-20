export class SearchedMember {
  householdId: string;
  christianName: string;
  ethnicName: string;
  selected: boolean;
  constructor(householdId: string, christianName: string, ethnicName: string) {
    this.householdId = householdId;
    this.christianName = christianName;
    this.ethnicName = ethnicName;
  }
}
