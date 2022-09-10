import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  signUp(users: any) {
    return this.http.post(`${environment.serverURL}users/signup`, users)
  }

  login(user: any) {
    return this.http.post(`${environment.serverURL}users/login`, user)
  }

  generateOTP(mobile: any) {
    return this.http.post(`${environment.serverURL}generateOTP/`, { mobile })
  }

  loginWithOtp(data: any) {
    return this.http.post(`${environment.serverURL}generateOTP/LoginOTP`, data)
  }

  updateUserProfile(userId: string, data: any) {
    return this.http.patch(`${environment.serverURL}users/${userId}`, data)
  }

  getUserDetail(userId: string) {
    return this.http.get(`${environment.serverURL}users/${userId}`)
  }
}
