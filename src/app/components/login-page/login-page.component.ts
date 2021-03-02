import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttpService } from 'src/app/services/http-services/auth-http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  username: string;
  password: string;
  errorMessage: string;
  isSigningIn = false;
  constructor(
    private authHttpService: AuthHttpService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  signIn() {
    this.isSigningIn = true;
    this.errorMessage = undefined;
    this.authHttpService.signIn(this.username, this.password).subscribe(
      (HttpResponse: any) => {
        this.isSigningIn = false;
        const { username, admin, accessToken } = HttpResponse;
        if (admin) {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['board']);
        }
        localStorage.setItem('username', username);
        localStorage.setItem('accessToken', accessToken);
      },
      (HttpError: HttpErrorResponse) => {
        this.errorMessage = HttpError.error;
        this.isSigningIn = false;
      }
    );
  }
}
