import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MENU_OPTIONS } from 'src/app/constant-data';
import { HouseholdCreatorComponent } from '../household/household-creator/household-creator.component';
import { ManageBecComponent } from '../bec-group/manage-bec/manage-bec.component';
import { DialogService } from 'src/app/services/dialog.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  menuOptions = MENU_OPTIONS;
  username: string;
  constructor(public routeService: RouteService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username')
  }

}
