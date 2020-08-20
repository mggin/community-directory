import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthService } from './services/auth.service';
import { HouseholdBoardComponent } from './components/household-board/household-board.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/board' },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AuthService],
    data: { redirect: true },
  },
  {
    path: 'board',
    component: HouseholdBoardComponent,
    canActivate: [AuthService],
    data: { redirect: false },
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
