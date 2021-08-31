import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/interfaces/meeting';
import { MeetingPayload } from 'src/app/interfaces/requestInterface/MeetingPayload';
import { MeetingPageResponse } from 'src/app/interfaces/responseInterface/MeetingPageResponse';
import { User } from 'src/app/interfaces/user';
import { MeetingService } from 'src/app/services/meeting.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  meetings?: Meeting[];
  meeting: any;
  user?: User;

  page: MeetingPayload = {
    page: 0,
    size: 20,
  };
  MeetingPageResponse?: MeetingPageResponse;
  error: boolean = false;
  message: string = '';

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private route: Router,
    private meetingService: MeetingService
  ) {
    this.loginForm = formBuilder.group({
      username: formBuilder.control('', [
        Validators.required,
        Validators.maxLength(2),
      ]),
      selectedMeeting: formBuilder.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    //  this.userService.getUserByUsername.
    this.meetingService.getMeetings(this.page).subscribe(
      (response) => {
        console.log(JSON.stringify(response));
        if (response.statusCode == 200 && response.data.content.length > 0) {
          this.MeetingPageResponse = response;
          this.meetings = response.data.content;
        }
        this.error = false;
      },
      (error) => {
        console.error(error);
        this.message =
          ' Refresh your browser. An error occurred. If it persisted contact GEC Admin Office';
        this.error = true;
      }
    );
  }

  public control(name: string) {
    return this.loginForm.get(name);
  }

  public submitLogin() {
    console.log(this.loginForm);
    if (
      this.loginForm.value.username == '' ||
      this.loginForm.value.selectedMeeting == ''
    ) {
      this.message = 'User ID or Select Meeting is required';
      this.error = true;
      return;
    } else if (this.loginForm.errors != null) {
      this.message = 'You hae an error in your submission';
      this.error = true;

      return;
    } else {
      this.error = false;

      this.loginUser(
        this.loginForm.value.username,
        +this.loginForm.value.selectedMeeting
      );
    }
  }

  loginUser(username: string, meetingID: number) {
    this.userService.getUserByUsername(username).subscribe(
      (response) => {
        console.log(JSON.stringify(response));
        this.error = false;
        this.user = response;
        localStorage.setItem('user', JSON.stringify(response));
        this.route.navigate(['/dashboard/meeting/view/' + meetingID]);
      },
      (error) => {
        console.error(JSON.stringify(error));
        this.error = true;
        this.message =
          'Incorrect Gec User ID. Try agin or Register for User ID';
      }
    );
  }
}
