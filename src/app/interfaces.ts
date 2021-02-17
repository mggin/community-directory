import { Member } from './models/member';

export interface LoginResponse {
  accessToken: string;
  isAdmin: boolean;
}

export interface BecProps {
  id: string;
  name: string;
  locations: string;
  leaderId: string;
  leaderName: string;
  assistantId: string;
  assistantName: string;
}

export interface CommunityProps {
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
}

export interface ClientProps {
  communityName: string;
  communityCode: string;
  active: string;
  codeVisibility: boolean;
}

export interface HouseholdProps {
  householdId: string;
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
  id: string;
  memberId: string;
  role: string;
  name: string;
}

export interface MemberProps {
  memberId: string;
  householdId: string;
  householdNo: number;
  chrisitianName: string;
  ethnicName: string;
  nickName: string;
  birthYear: number;
  phone: string;
  gender: string;
}

export interface UserProps {
  firstName: string;
  lastName: string;
  communityName: string;
  active: string;
}
