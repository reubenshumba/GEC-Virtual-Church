import { Branch } from './branch';
import { Role } from './role';

export interface Meeting {
  meetingID: number;
  title: string;
  description: string;
  meetingType: string;
  meetingDate: string;
  branch: string;
  hostBy: string;
  videoEmbedCode: string;
  chatEmbedCode: string;
  dateCreated: number;
  dateUpdated: number;
}
