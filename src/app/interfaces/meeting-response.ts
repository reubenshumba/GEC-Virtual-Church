import { Meeting } from './meeting';

export interface MeetingResponse {
  statusCode: number;
  statusDescription: string;
  data: Meeting[];
}
