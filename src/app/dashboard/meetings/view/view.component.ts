import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingResponse } from 'src/app/interfaces/meeting-response';
import { User } from 'src/app/interfaces/user';
import { MeetingService } from 'src/app/services/meeting.service';
import { UserService } from 'src/app/services/user.service';
//import postscribe from postscribe;

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  meetingID: number = 0;
  title: string = '';
  host: string = '';
  user?: User;
  chatUrl: string = '';
  meetingURL: string = '';
  constructor(
    private meetingService: MeetingService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // get URL parameters
    this.activatedRoute.params.subscribe((params) => {
      this.meetingID = params.id;
    });
    if (this.meetingID == 0 || localStorage.user == null) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    localStorage.user = localStorage.getItem('user');

    if (this.meetingID == 0 || localStorage.user == null) {
      this.router.navigate(['login']);
    }

    this.user = JSON.parse(localStorage.user);
    console.log('user ==> ' + localStorage.user);

    this.meetingService.getMeeting(this.meetingID).subscribe(
      (response: MeetingResponse) => {
        localStorage.setItem('liveMeeting', JSON.stringify(response));
        console.log('Meeitng to watch ' + JSON.stringify(response));
        this.title = response.data[0].title;
        this.host = response.data[0].hostBy;
        this.meetingURL = response.data[0].videoEmbedCode;
        this.chatUrl = response.data[0].chatEmbedCode;
      },
      (error) => {
        console.log('Opps An error has happened ' + JSON.stringify(error));
      }
    );
  }
}
