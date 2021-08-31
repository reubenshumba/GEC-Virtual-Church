import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BackendBaseService } from '../utils/backend-base-service';
import { BranchResponse } from '../interfaces/branch-response';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private httpClient: HttpClient) {}

  getBranches(): Observable<any> {
    return this.httpClient.get<any>(`${BackendBaseService.baseURL}/branches`);
  }

  getBranch(id: number): Observable<BranchResponse> {
    return this.httpClient.get<BranchResponse>(
      `${BackendBaseService.baseURL}/branch/` + id
    );
  }
}
