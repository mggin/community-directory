import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HouseholdBoardComponent } from './components/household-board/household-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HouseholdCreatorComponent } from './components/household-creator/household-creator.component';
import { MemberContainerComponent } from './components/member-container/member-container.component';
import { DialogTemplateComponent } from './components/dialog-template/dialog-template.component';
import { HouseholdDetailContainerComponent } from './components/household-detail-container/household-detail-container.component';
import { HouseholdEditorComponent } from './components/household-editor/household-editor.component';

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
    HouseholdEditorComponent
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
  entryComponents: [HouseholdCreatorComponent, HouseholdEditorComponent, MemberContainerComponent]
})
export class AppModule { }
