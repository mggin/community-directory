import { HouseholdEditorComponent } from './components/household-editor/household-editor.component';

export interface LoginResponse {
  accessToken: string;
}

export interface Householder {
  christian_name: string;
  ethnicName: string;
  householdId: number;
}

export interface HouseholdEditorData {
  householdId: string;
}

export interface CreateMemberResopnse {
  createdMembers: CreatedMember[];
}

export interface CreatedMember {
  uuid: string;
  insertedId: number;
}

export interface CreateHouseholdResponse {
  householderUUID: string;
  householdId: string;
}

export interface SearchedMemberResponse {
  data: SearchedMemberData[];
}

export interface SearchedMemberData {
  householdId: string;
  christianName: string;
  ethnicName: string;
}

export interface Member {
  id: number;
  householdId: number;
  householdNo: number;
  christianName: string;
  ethnicName: string;
  nickName: string;
  birthYear: number;
  phone: string;
  gender: string;
}

export interface HouseholdDetail {
  id: number;
  addressLine: string;
  becGroup: string;
  city: string;
  email: string;
  primaryPhone: string;
  secondaryPhone: string;
  state: string;
  zipCode: number;
}
