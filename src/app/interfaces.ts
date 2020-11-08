import { Member } from './models/member';

export interface LoginResponse {
  accessToken: string;
  isAdmin: boolean;
}

export interface BecProps {
  id: string;
  name: string;
  leaderId: string;
  assistantId: string;
}

export interface CommunityProps {
  name: string;
  communityCode: string;
  city: string;
  state: string;
}

export interface HouseholdProps {
  householdId: string,
  becId: string;
  becName: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
  householderId: string;
}

export interface HouseholdInfoProps {
  householdDetail: Partial<HouseholdProps>;
  members: Member[];
}

export interface LeaderProps {
  id: string,
  memberId: string,
  role: string,
  name: string  
}

export interface MemberProps {
  memberId: string,
  householdId: string;
  householdNo: number;
  chrisitianName: string;
  ethnicName: string;
  nickName: string;
  birthYear: number;
  phone: string;
  gender: string;
}


