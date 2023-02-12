export class SearchedMember {
  id: string;
  householdId: string;
  name: string;
  selected: boolean;
  constructor(householdId: string, name: string) {
    this.householdId = householdId;
    this.name = name;
  }
}
