import { Branch } from './branch';

export interface BranchResponse {
  statusCode: number;
  statusDescription: string;
  data: Branch[];
}
