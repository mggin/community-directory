import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private router: Router) { }

  toBoard(householdId: string = undefined) {
    this.router.navigate(['board', householdId])
  }

  toCreate() {
    this.router.navigate(['board', 'create'])
  }
  
  toBec() {
    this.router.navigate(['board', 'bec'])
  }

  toCommittee() {
    this.router.navigate(['board', 'committee'])
  }

}
