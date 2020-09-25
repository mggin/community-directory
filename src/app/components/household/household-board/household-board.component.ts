import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Observable, forkJoin } from 'rxjs';
import {
  Member,
  HouseholdDetail,
  SearchedMemberResponse,
  SearchedMemberData,
} from 'src/app/interfaces';
import { MEMBER_ACTIONS, MODAL_NAMES } from 'src/app/constant-data';
import { SearchedMember } from 'src/app/models/searched-member';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'household-board',
  templateUrl: './household-board.component.html',
  styleUrls: ['./household-board.component.css'],
})
export class HouseholdBoardComponent implements OnInit {
  USER_ACTION = MEMBER_ACTIONS.EDIT;
  searchedMembers: SearchedMember[];
  name: string;
  members: Member[];
  householdDetail: HouseholdDetail;
  becGroupOptions: Observable<string[]>;
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private routeService: RouteService,
    private dialogService: DialogService
  ) {
    route.params.subscribe((param) => {
      const { modal } = param;
      switch (modal) {
        case MODAL_NAMES.bec:
          dialogService.openManageBec();
          break;
        case MODAL_NAMES.create:
          dialogService.openHouseholdCreator();
          break;
        case MODAL_NAMES.committee:
          dialogService.openManageCommittee();
          break;
        case MODAL_NAMES.edit:
          const { householdId } = param;
          console.log(householdId);
          this.openHouseholdEditor(householdId);
          break;
        default:
          break;
      }
    });
  }

  ngOnInit(): void {
    this.becGroupOptions = this.httpService.getBecGroupOptions();
  }

  searchMembers() {
    if (this.name) {
      this.httpService
        .searchMembers(this.name)
        .subscribe((HttpResponse: any) => {
          this.searchedMembers = HttpResponse.data;
        });
    }
  }

  handleHouseholdBoard(searchedMember: SearchedMember) {
    this.searchedMembers.forEach((searchedMember: SearchedMember) => {
      searchedMember.selected = false;
    });
    const { householdId } = searchedMember;
    searchedMember.selected = true;
    this.queryHousehold(householdId);
  }

  queryHousehold(householdId: string) {
    forkJoin([
      this.httpService.getMembers(householdId),
      this.httpService.getHousehold(householdId),
    ]).subscribe((responses) => {
      this.members = responses[0]['data'];
      this.householdDetail = responses[1]['data'];
    });
  }

  openHouseholdEditor(householdId: string) {
    const dialogRef = this.dialogService.openHouseholdEditor( { householdId });

    dialogRef.afterClosed().subscribe((householdId: string) => {
      if (householdId) {
        this.queryHousehold(householdId);
      } else {
        this.members = undefined;
        this.householdDetail = undefined;
        this.searchMembers();
      }
    });
  }
}
