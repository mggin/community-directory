import { Injectable, Component, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HouseholdCreatorComponent } from '../components/household/household-creator/household-creator.component';
import { ManageBecComponent } from '../components/bec-group/manage-bec/manage-bec.component';
import { HouseholdEditorComponent } from '../components/household/household-editor/household-editor.component';
import { ManageCommitteeComponent } from '../components/committee/manage-committee/manage-committee.component';
import { AssignCommitteeComponent } from '../components/committee/assign-committee/assign-committee.component';

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

  openHouseholdEditor(data = undefined) {
    return this.open(HouseholdEditorComponent, data);
  }

  openManageCommittee(data = undefined) {
    return this.open(ManageCommitteeComponent, data);
  }

  openCommitteeEditor(data = undefined) {
     return this.dialog.open(AssignCommitteeComponent, data)
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
