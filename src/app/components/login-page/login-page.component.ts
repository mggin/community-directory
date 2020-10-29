import { Component, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/interfaces';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';
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
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {}

  signIn() {
    this.isSigningIn = true;
    this.errorMessage = undefined;
    this.authHttpService.signIn(this.username, this.password).subscribe(
      (HttpResponse: LoginResponse) => {
        this.isSigningIn = false;
        const { accessToken } = HttpResponse;
        const decodedToken = this.validationService.DecodeToken(accessToken);
        const { username } = decodedToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('username', username);
        this.isSigningIn = true;
        this.router.navigate(['board']);
      },
      (HttpError: HttpErrorResponse) => {
        this.errorMessage = HttpError.error;
        this.isSigningIn = false;
      }
    );
  }
}
