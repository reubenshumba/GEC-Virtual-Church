import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleResponse } from '../interfaces/role-response';
import { BackendBaseService } from '../utils/backend-base-service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private httpClient: HttpClient) {}

  getRoles(): Observable<RoleResponse> {
    return this.httpClient.get<RoleResponse>(
      `${BackendBaseService.baseURL}/roles`
    );
  }

  getRole(id: number): Observable<RoleResponse> {
    return this.httpClient.get<RoleResponse>(
      `${BackendBaseService.baseURL}/role/` + id
    );
  }

  getRoleByName(roleName: string): Observable<RoleResponse> {
    return this.httpClient.get<RoleResponse>(
      `${BackendBaseService.baseURL}/role?roleName=` + roleName
    );
  }
}
