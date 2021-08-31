import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
