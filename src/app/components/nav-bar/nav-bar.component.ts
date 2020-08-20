import { Component, OnInit } from '@angular/core';
import { HouseholdCreatorComponent } from '../household-creator/household-creator.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  menuOption = {
    CREATE_HOUSEHOLD: 'Create Household',
    BEC: 'B.E.C',
    SIGN_OUT: 'Sign out',
  };
  username: string;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username')
  }

  navigateOptions(option: string) {
    let component: any;
    switch (option) {
      case this.menuOption.CREATE_HOUSEHOLD:
        component = HouseholdCreatorComponent;
        break;
      case this.menuOption.BEC:
        break;
      case this.menuOption.SIGN_OUT:
        break;
      default:
        break;
    }
    this.dialog.open(component, {
      width: '98vw',
      maxWidth: '98vw',
      height: '95vh',
      disableClose: true,
    });
  }
}
