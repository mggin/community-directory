import { Component, OnInit, Input } from '@angular/core';
import { HouseholdDetail } from 'src/app/models/household-detail';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { MEMBER_ACTIONS } from 'src/app/constant-data';
import { MemberForm } from 'src/app/models/member-form';
import { HouseholdDetailFormSetting } from 'src/app/models/household-detail-form-setting';

@Component({
  selector: 'household-detail-container',
  templateUrl: './household-detail-container.component.html',
  styleUrls: ['./household-detail-container.component.css'],
})
export class HouseholdDetailContainerComponent implements OnInit {
  @Input() householdDetail: HouseholdDetail;
  @Input() memberForms: MemberForm[];
  @Input() setting: HouseholdDetailFormSetting;
  becGroupOptions: Observable<string[]>;
  showEditElements = true;
  constructor(private httpService: HttpService) {}
  ngOnInit(): void {
    this.becGroupOptions = this.httpService.getBecGroupOptions();
  }
}
