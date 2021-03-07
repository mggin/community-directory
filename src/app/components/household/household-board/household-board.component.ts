import { Component, OnInit } from '@angular/core';
import { ACTIONS, MODAL_NAMES } from 'src/app/constant-data';
import { SearchedMember } from 'src/app/models/searched-member';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { HouseholdHttpService } from 'src/app/services/http-services/household-http.service';
import { MatDialogRef } from '@angular/material/dialog';
import { RouteService } from 'src/app/services/route.service';
import { MemberHttpService } from 'src/app/services/http-services/member-http.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'household-board',
  templateUrl: './household-board.component.html',
  styleUrls: ['./household-board.component.css'],
})
export class HouseholdBoardComponent implements OnInit {
  timerId: any;
  USER_ACTION = ACTIONS.EDIT;
  searchedMembers: any;
  name: string;
  members: any;
  household: any;
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
        case MODAL_NAMES.GROUP:
          this.dialogRef = dialogService.openManageGroup();
          break;
        case MODAL_NAMES.CREATE:
          this.dialogRef = dialogService.openHouseholdCreator();
          break;
        case MODAL_NAMES.EDIT:
          const { householdId } = this.route.snapshot.queryParams;
          this.dialogRef = dialogService.openHouseholdEditor({ householdId });
          break;
        case MODAL_NAMES.LEADER:
          this.dialogRef = dialogService.openManageLeader();
          break;
        default:
          break;
      }
    });
  }

  ngOnInit(): void {
    this.householdHttpService
      .getHouseholds({ recentHouseholds: true, size: 10 })
      .pipe(
        map((households: any) => {
          return households.map((household) => {
            return {
              householdId: household['id'],
              fullName: household['householderFullName'],
              otherName: household['householderOtherName'],
            };
          });
        })
      )
      .subscribe(
        (HttpResponse: any) => {
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
      this.memberHttpService
        .searchMembers({ name: this.name, size: 5 })
        .subscribe(
          (HttpResponse: any) => {
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
    this.householdHttpService
      .getHousehold({ householdId })
      .subscribe((HttpResponse: any) => {
        this.household = HttpResponse;
      });
    this.memberHttpService
      .getMembers({ householdId })
      .subscribe((HttpResponse: any) => {
        // console.log(HttpResponse)
        this.members = HttpResponse;
      });
  }
}
