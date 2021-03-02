import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HouseholdBoardComponent } from './components/household/household-board/household-board.component';
import { HouseholdCreatorComponent } from './components/household/household-creator/household-creator.component';
import { MemberContainerComponent } from './components/household/member-container/member-container.component';
import { HouseholdDetailContainerComponent } from './components/household/household-detail-container/household-detail-container.component';
import { HouseholdEditorComponent } from './components/household/household-editor/household-editor.component';
import { AuthInterceptor } from './services/http-interceptor';
import { ManageLeaderComponent } from './components/leader/manage-leader/manage-leader.component';
import { AdminModule } from './components/admin/admin.module';
import { SharedModule } from './components/shared/shared.module';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ManageGroupComponent } from './components/group/manage-group/manage-group.component';
import { BrowseGroupComponent } from './components/group/browse-group/browse-group.component';
import { GroupFormComponent } from './components/group/group-form/group-form.component';
import { LeaderFormComponent } from './components/leader/leader-form/leader-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HouseholdBoardComponent,
    HouseholdCreatorComponent,
    MemberContainerComponent,
    HouseholdDetailContainerComponent,
    HouseholdEditorComponent,
    ManageLeaderComponent,
    ManageGroupComponent,
    BrowseGroupComponent,
    GroupFormComponent,
    LeaderFormComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    SharedModule,
  ],
  providers: [
    {
      useClass: AuthInterceptor,
      provide: HTTP_INTERCEPTORS,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    HouseholdCreatorComponent,
    HouseholdEditorComponent,
    MemberContainerComponent,
    ManageLeaderComponent,
    BrowseGroupComponent,
    ManageGroupComponent,
  ],
})
export class AppModule {}
