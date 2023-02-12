import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { CommunityFormComponent } from './community-form/community-form.component';
import { ClientFormComponent } from './client-form/client-form.component';

@NgModule({
  declarations: [
    AdminComponent,
    UserFormComponent,
    CommunityFormComponent,
    ClientFormComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule, SharedModule],
  entryComponents: [
    UserFormComponent,
    CommunityFormComponent,
    ClientFormComponent,
  ],
})
export class AdminModule {}
