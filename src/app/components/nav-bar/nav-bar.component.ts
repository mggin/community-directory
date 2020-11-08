import { Component, Input, OnInit } from '@angular/core';
import { MENU_OPTIONS } from 'src/app/constant-data';
import { RouteService } from 'src/app/services/route.service';
import { AuthHttpService } from 'src/app/services/http-services/auth-http.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Input() hideElements: boolean = false;
  menuOptions = MENU_OPTIONS;
  username: string;
  constructor(
    public routeService: RouteService,
    private authHttpService: AuthHttpService
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  signOut() {
    this.authHttpService.signOut().subscribe(
      (HttpResponse) => {
        localStorage.clear();
        this.routeService.toLogin();
      },
      (HttpError) => {
        console.error(HttpError);
      }
    );
  }
}
