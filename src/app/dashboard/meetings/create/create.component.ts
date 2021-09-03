import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meeting } from 'src/app/interfaces/requestInterface/meeting';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  meetingForm: FormGroup;
  error: boolean = false;
  errorMessage: string = '';
  meetingResponse: any;
  meetings: any;

  constructor(
    private formBuild: FormBuilder,
    private router: Router,
    private meetingService: MeetingService
  ) {
    this.meetingForm = formBuild.group({
      title: formBuild.control('', [Validators.required]),
      description: formBuild.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      meetingType: formBuild.control('', [Validators.required]),
      meetingDate: formBuild.control('', [Validators.required]),
      hostBy: formBuild.control('', [Validators.required]),
      videoEmbedCode: formBuild.control('', [Validators.required]),
      chatEmbedCode: formBuild.control('', [Validators.required]),
      branch: formBuild.control('', [Validators.required]),
      publish: formBuild.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  create() {
    var meeting: Meeting = {
      title: this.meetingForm.controls.title.value,
      description: this.meetingForm.controls.description.value,
      meetingType: this.meetingForm.controls.meetingType.value,
      meetingDate: this.meetingForm.controls.meetingDate.value,
      // branch: this.meetingForm.value.meetingDate,
      hostBy: this.meetingForm.controls.hostBy.value,
      videoEmbedCode: this.meetingForm.controls.videoEmbedCode.value,
      chatEmbedCode: this.meetingForm.controls.chatEmbedCode.value,
      branchID: 1, //toda
      publish: this.meetingForm.controls.publish.value,
    };

    if (this.meetingForm.errors != null) {
      this.errorMessage = 'You have an error in your submission';
      this.error = true;
    } else {
      this.meetingService.createMeeting(meeting).subscribe(
        (response) => {
          console.log(JSON.stringify(response));

          if (response.statusCode == 201 && response.data.length > 0) {
            this.meetingResponse = response;

            //this.meetings = response.data;
            localStorage.setItem(
              'createdMeeting',
              JSON.stringify(response.data)
            );
            console.log(JSON.stringify(this.meetings));
          }

          this.error = false;
          this.router.navigate(['index']);
        },
        (error) => {
          console.error(error);
          this.errorMessage =
            ' Refresh your browser. An error occurred. If it persist contact GEC Admin Office';
          this.error = true;
        }
      );
    }
  }
}
