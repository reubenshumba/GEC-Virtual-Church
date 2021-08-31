import { Branch } from './branch';
import { Role } from './role';

export interface UserResponse {
  statusCode: number;
  statusDescription: string;
  data: {
    userID: number;
    userEmail: string;
    username: string;
    password: string;
    enable: boolean;
    title: string;
    phoneNumber: number;
    address: string;
    fullName: string;
    userCategory: string;
    dateCreated: number;
    dateUpdated: number;
    roles?: Role[];
    branch?: Branch;
  };
}
