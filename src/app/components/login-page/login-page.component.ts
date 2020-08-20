import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { LoginResponse } from 'src/app/interfaces';
import { Router } from '@angular/router';

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
  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {}

  signIn() {
    this.isSigningIn = true;
    this.errorMessage = undefined;
    this.httpService.signIn(this.username, this.password).subscribe(
      (response: LoginResponse) => {
        this.isSigningIn = false;
        const { accessToken } = response;
        localStorage.setItem('accessToken', accessToken);
        this.router.navigate(['board']);
      },
      (HttpErrorResponse) => {
        this.errorMessage = HttpErrorResponse.error.message;
        this.isSigningIn = false;
      }
    );
  }
}
