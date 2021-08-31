import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserResponse } from '../interfaces/userResponse';
import { BackendBaseService } from '../utils/backend-base-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  registerUser(user: any): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(
      `${BackendBaseService.baseURL}/users/register`,
      user
    );
  }
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${BackendBaseService.baseURL}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(
      `${BackendBaseService.baseURL}/user/` + id
    );
  }

  getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(
      `${BackendBaseService.baseURL}/user/by-username/` + username
    );
  }

  // saveUser(user: User): Observable<User> {
  //   return this.httpClient.post(`${BackendBaseService.baseURL}/register`, user);
  // }
}
