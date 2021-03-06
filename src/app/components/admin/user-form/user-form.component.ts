import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { UserForm } from 'src/app/models/user-form';
import { CommunityHttpService } from 'src/app/services/http-services/community-http.service';
import { UserHttpService } from 'src/app/services/http-services/user-http.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  communities$: Observable<any>;
  user = new User();
  userForm = new UserForm();
  message = new Message();
  constructor(
    private communityHttpService: CommunityHttpService,
    private userHttpService: UserHttpService,
    public dialogRef: MatDialogRef<UserFormComponent>
  ) {}

  ngOnInit(): void {
    this.communities$ = this.communityHttpService.getCommunities(['id', 'name']);
  }

  nameOnChange() {
    const { firstName, lastName } = this.user;
    this.user.username = `${firstName || ''}.${lastName || ''}`.toLowerCase();
  }

  onConfirmPasswordChange() {
    this.userForm.requiredConfirmPassword =
      this.user.password !== this.user.confirmPassword;
  }

  createUser() {
    this.message = new Message();
    const {
      communityId,
      firstName,
      lastName,
      username,
      password,
      confirmPassword,
    } = this.user;
    this.userForm.requiredCommunityId = !communityId;
    this.userForm.requiredFirstName = !firstName;
    this.userForm.requiredLastName = !lastName;
    this.userForm.requiredUsername = !username;
    this.userForm.requiredPassword = !password;
    this.userForm.requiredPasswordLength = password && password.length <= 6;
    this.userForm.requiredConfirmPassword = !confirmPassword;
    if (Object.keys(this.userForm).every((key) => !this.userForm[key])) {
      this.userHttpService.createUser(this.user).subscribe(
        (HttpResponse) => {
          this.dialogRef.close({ shouldReload: true });
        },
        (HttpError) => {
          this.message.error = HttpError;
        }
      );
    } else {
      this.message.error = `Please fill out the required fields.`;
    }
  }
}
