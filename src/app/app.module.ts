import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HouseholdBoardComponent } from './components/household/household-board/household-board.component';
import { HouseholdCreatorComponent } from './components/household/household-creator/household-creator.component';
import { MemberContainerComponent } from './components/household/member-container/member-container.component';
import { HouseholdDetailContainerComponent } from './components/household/household-detail-container/household-detail-container.component';
import { HouseholdEditorComponent } from './components/household/household-editor/household-editor.component';
import { AuthInterceptor } from './services/http-interceptor';
import { ManageLeaderComponent } from './components/leader/manage-leader/manage-leader.component';
import { AssignLeaderComponent } from './components/leader/assign-leader/assign-leader.component';
import { ManageBecComponent } from './components/manage-bec/manage-bec.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavBarComponent,
    HouseholdBoardComponent,
    HouseholdCreatorComponent,
    MemberContainerComponent,
    HouseholdDetailContainerComponent,
    HouseholdEditorComponent,
    ManageBecComponent,
    ManageLeaderComponent,
    AssignLeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
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
    ManageBecComponent,
    ManageLeaderComponent,
    AssignLeaderComponent
  ],
})
export class AppModule {}
