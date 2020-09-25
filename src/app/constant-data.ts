export const MEMBER_ACTIONS = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
};

export const COMMITTEE_ACTIONS = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
};

export const PROGRESS_TYPES = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

export const STATUS_OPTIONS = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
};

export const HOUSEHOLD_SQL_EXCHANGE = {
  becGroup: 'bec_group',
  primaryPhone: 'primary_phone',
  secondaryPhone: 'secondary_phone',
  email: 'email',
  addressLine: 'address_line',
  city: 'city',
  zipCode: 'zip_code',
  state: 'state',
  householderId: 'householder_id',
};

export const MEMBER_SQL_EXCHANGE = {
  id: 'id',
  householdId: 'household_id',
  householdNo: 'household_no',
  christianName: 'christian_name',
  ethnicName: 'ethnic_name',
  nickName: 'nick_name',
  birthYear: 'birth_year',
  phone: 'phone',
  gender: 'gender',
};

export const GENDER_OPTIONS = [
  {
    short: 'M',
    long: 'Male',
  },
  {
    short: 'F',
    long: 'Female',
  },
];

export const MENU_OPTIONS = {
  CREATE_HOUSEHOLD: 'Create Household',
  MANAGE_BEC: 'Manage B.E.C',
  SIGN_OUT: 'Sign out',
};

export const BEC_COLUMNS = {
  householderName: 'Name',
  members: 'Members',
  addressLine: 'Address',
  city: 'City',
  state: 'State',
  zipCode: 'Zip Code',
  primaryPhone: 'Primary Phone',
  secondaryPhone: 'Secondary Phone',
};

export const MODAL_NAMES = {
  bec: 'bec',
  create: 'create',
  edit: 'edit',
  committee: 'committee'
};

