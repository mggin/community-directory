import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BecCreatorComponent } from '../components/bec/bec-creator/bec-creator.component';
import { ManageBecComponent } from '../components/bec/manage-bec/manage-bec.component';
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

  openManageBec(data = undefined) {
    return this.open(ManageBecComponent, data);
  }

  openBecCreator(data = undefined) {
    return this.open(BecCreatorComponent, data);
  }

  openHouseholdEditor(data = undefined) {
    return this.open(HouseholdEditorComponent, data);
  }

  openManageLeader(data = undefined){
    return this.open(ManageLeaderComponent, data);
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
