import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogTemplateComponent } from './components/dialog-template/dialog-template.component';
import { HouseholdBoardComponent } from './components/household/household-board/household-board.component';
import { HouseholdCreatorComponent } from './components/household/household-creator/household-creator.component';
import { MemberContainerComponent } from './components/household/member-container/member-container.component';
import { HouseholdDetailContainerComponent } from './components/household/household-detail-container/household-detail-container.component';
import { HouseholdEditorComponent } from './components/household/household-editor/household-editor.component';
import { ManageBecComponent } from './components/bec-group/manage-bec/manage-bec.component';
import { ManageCommitteeComponent } from './components/committee/manage-committee/manage-committee.component';
import { AssignCommitteeComponent } from './components/committee/assign-committee/assign-committee.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavBarComponent,
    HouseholdBoardComponent,
    HouseholdCreatorComponent,
    MemberContainerComponent,
    DialogTemplateComponent,
    HouseholdDetailContainerComponent,
    HouseholdEditorComponent,
    ManageBecComponent,
    ManageCommitteeComponent,
    AssignCommitteeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [HouseholdCreatorComponent, HouseholdEditorComponent, MemberContainerComponent, ManageBecComponent]
})
export class AppModule { }
