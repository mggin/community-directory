import { HouseholdDetail } from './household-detail';
import { HouseholdDetailFormSetting } from './household-detail-form-setting';

export class HouseholdDetailForm {
    householdDetail: HouseholdDetail;
    setting: HouseholdDetailFormSetting;
    constructor(householdDetail = new HouseholdDetail(), setting = new HouseholdDetailFormSetting()) {
        this.householdDetail = householdDetail;
        this.setting = setting;
    }
}