import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ACTIONS, MODAL_NAMES } from 'src/app/constant-data';
import { SearchedMember } from 'src/app/models/searched-member';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { HouseholdHttpService } from 'src/app/services/http-services/household-http.service';
import { MatDialogRef } from '@angular/material/dialog';
import { RouteService } from 'src/app/services/route.service';
import { MemberHttpService } from 'src/app/services/http-services/member-http.service';
import { Member } from 'src/app/models/member';
import { HouseholdProps, HouseholdInfoProps } from 'src/app/interfaces';
@Component({
  selector: 'household-board',
  templateUrl: './household-board.component.html',
  styleUrls: ['./household-board.component.css'],
})
export class HouseholdBoardComponent implements OnInit {
  timerId: any;
  USER_ACTION = ACTIONS.EDIT;
  searchedMembers: SearchedMember[];
  name: string;
  members: Member[];
  householdDetail: Partial<HouseholdProps>;
  becGroupOptions: Observable<string[]>;
  householdInfo: HouseholdInfoProps;
  dialogRef: MatDialogRef<any>;
  constructor(
    private memberHttpService: MemberHttpService,
    private route: ActivatedRoute,
    private householdHttpService: HouseholdHttpService,
    private dialogService: DialogService,
    public routeService: RouteService
  ) {
    route.queryParams.subscribe((params) => {
      const { householdId } = params;
      if (householdId) {
        this.queryHousehold(householdId);
      }
    });
    route.params.subscribe((param) => {
      const { modal } = param;
      switch (modal) {
        case MODAL_NAMES.BEC:
          this.dialogRef = dialogService.openManageBec();
          break;
        case MODAL_NAMES.CREATE:
          this.dialogRef = dialogService.openHouseholdCreator();
          break;
        case MODAL_NAMES.EDIT:
          const { householdId } = this.route.snapshot.queryParams;
          this.dialogRef = dialogService.openHouseholdEditor({ householdId });
          break;
        case MODAL_NAMES.COMMITTEE:
          this.dialogRef = dialogService.openManageLeader();
          break;
        default:
          break;
      }
    });
  }

  ngOnInit(): void {
    this.householdHttpService.getHouseholdsLastEntry().subscribe(
      (HttpResponse: SearchedMember[]) => {
        this.searchedMembers = HttpResponse;
      },
      (HttpError) => {
        console.error(HttpError);
      }
    );
  }

  searchMembers() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      this.memberHttpService.searchMember(this.name).subscribe(
        (HttpResponse: SearchedMember[]) => {
          this.searchedMembers = HttpResponse;
        },
        (HttpError) => {
          console.log(HttpError);
        }
      );
    }, 1000);
  }

  handleHouseholdBoard(searchedMember: SearchedMember) {
    this.searchedMembers.forEach((searchedMember: SearchedMember) => {
      searchedMember.selected = false;
    });
    const { householdId } = searchedMember;
    searchedMember.selected = true;
    this.routeService.toBoard(householdId);
  }

  queryHousehold(householdId: string) {
    this.householdHttpService.getHouseholdInfo(householdId).subscribe(
      (HttpResponse: HouseholdInfoProps) => {
        const { members, householdDetail } = HttpResponse;
        this.householdInfo = HttpResponse;
        this.householdDetail = householdDetail;
        this.members = members;
      },
      (HttpError) => {}
    );
  }
}
