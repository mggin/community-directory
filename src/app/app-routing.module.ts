import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HouseholdBoardComponent } from './components/household/household-board/household-board.component';
import { AuthGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/admin-guard';
import { LoginGuard } from './guards/login-guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/board' },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginGuard],
    // data: { redirect: true },
  },
  {
    path: 'board',
    component: HouseholdBoardComponent,
    canActivate: [AuthGuard],
    data: { redirect: false },
  },
  {
    path: 'board/:modal',
    canActivate: [AuthGuard],
    data: { redirect: false },
    component: HouseholdBoardComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.module').then((m) => m.AdminModule),
    // canLoad: [AdminGuard]
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
