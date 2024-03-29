import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrowseGroupComponent } from '../components/group/browse-group/browse-group.component';
import { HouseholdCreatorComponent } from '../components/household/household-creator/household-creator.component';
import { HouseholdEditorComponent } from '../components/household/household-editor/household-editor.component';
import { ManageLeaderComponent } from '../components/leader/manage-leader/manage-leader.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openHouseholdCreator(data = undefined) {
    return this.open(HouseholdCreatorComponent, data);
  }

  openManageGroup(data = undefined) {
    return this.open(BrowseGroupComponent, data);
  }

  openHouseholdEditor(data = undefined) {
    return this.open(HouseholdEditorComponent, data);
  }

  openManageLeader(data = undefined){
    return this.dialog.open(ManageLeaderComponent, {
      data,
      width: '50vw',
      maxWidth: '50vw',
      height: '95vh',
      disableClose: true,
    });
  }

  open(component: any, data: any) {
    return this.dialog.open(component, {
      data,
      width: '98vw',
      maxWidth: '98vw',
      height: '95vh',
      disableClose: true,
    });
  }
}
