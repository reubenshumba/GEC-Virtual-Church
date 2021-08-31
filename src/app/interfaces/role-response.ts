import { Role } from './role';

export interface RoleResponse {
  statusCode: number;
  statusDescription: string;
  data: Role[];
}
