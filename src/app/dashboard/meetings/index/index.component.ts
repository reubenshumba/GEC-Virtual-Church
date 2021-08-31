import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/interfaces/meeting';
import { MeetingPayload } from 'src/app/interfaces/requestInterface/MeetingPayload';
import { MeetingPageResponse } from 'src/app/interfaces/responseInterface/MeetingPageResponse';
import { User } from 'src/app/interfaces/user';
import { MeetingService } from 'src/app/services/meeting.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  meetings: Meeting[] = [];
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
  ) {}

  ngOnInit(): void {
    //  this.userService.getUserByUsername.
    this.meetingService.getMeetings(this.page).subscribe(
      (response) => {
        if (response.statusCode == 200 && response.data.content.length > 0) {
          this.MeetingPageResponse = response;
          this.meetings = response.data.content;
          console.log(JSON.stringify(this.meetings));
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
}
