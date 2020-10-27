import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private router: Router) { }

  toBoard(householdId: string = undefined) {
    householdId ? this.router.navigate(['board'], {queryParams: {householdId}}) : this.router.navigate(['board'])
  }

  toCreate() {
    this.router.navigate(['board', 'create'])
  }

  toEdit(householdId: string) {
    householdId ? this.router.navigate(['board', 'edit'], {queryParams: {householdId}}) : null;
  }
  
  toBec() {
    this.router.navigate(['board', 'bec'])
  }

  toCommittee() {
    this.router.navigate(['board', 'committee'])
  }

  toLogin() {
    this.router.navigate(['login'])
    location.reload();
  }

}
