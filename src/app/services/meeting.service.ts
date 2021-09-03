import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from '../interfaces/requestInterface/meeting';
import { MeetingResponse } from '../interfaces/meeting-response';
import { MeetingPayload } from '../interfaces/requestInterface/MeetingPayload';
import { MeetingPageResponse } from '../interfaces/responseInterface/MeetingPageResponse';
import { BackendBaseService } from '../utils/backend-base-service';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  constructor(private httpClient: HttpClient) {}

  getMeetings(payload: MeetingPayload): Observable<MeetingPageResponse> {
    return this.httpClient.post<MeetingPageResponse>(
      `${BackendBaseService.baseURL}/meetings`,
      payload
    );
  }

  getMeeting(id: number): Observable<any> {
    return this.httpClient.get<any>(
      `${BackendBaseService.baseURL}/meeting/` + id
    );
  }

  createMeeting(
    // branchID: number,
    meeting: Meeting
  ): Observable<MeetingResponse> {
    console.log('About to create a meeting => ' + JSON.stringify(meeting));

    return this.httpClient.post<MeetingResponse>(
      `${BackendBaseService.baseURL}/meetings/create`,
      meeting
    );
  }
}
