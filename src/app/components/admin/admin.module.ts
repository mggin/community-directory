import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { CommunityCreatorComponent } from './community-creator/community-creator.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminComponent, CommunityCreatorComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule
  ],
  entryComponents: [
    CommunityCreatorComponent
  ]
})
export class AdminModule { }
