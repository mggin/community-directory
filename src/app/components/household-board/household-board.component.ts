import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Observable, forkJoin } from 'rxjs';
import {
  Member,
  HouseholdDetail,
  SearchedMemberResponse,
  SearchedMemberData,
} from 'src/app/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { MEMBER_ACTIONS } from 'src/app/constant-data';
import { HouseholdEditorComponent } from '../household-editor/household-editor.component';
import { SearchedMember } from 'src/app/models/searched-member';

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
  constructor(private httpService: HttpService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.becGroupOptions = this.httpService.getBecGroupOptions();
  }

  searchMembers() {
    if (this.name) {
      this.httpService
        .searchMembers(this.name)
        .subscribe((HttpResponse: SearchedMemberResponse) => {
          this.searchedMembers = HttpResponse.data.map(
            (data: SearchedMemberData) => {
              return new SearchedMember(
                data.householdId,
                data.christianName,
                data.ethnicName
              );
            }
          );
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
    const dialogRef = this.dialog.open(HouseholdEditorComponent, {
      data: { householdId },
      width: '98vw',
      maxWidth: '98vw',
      height: '95vh',
      disableClose: true,
    });

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
