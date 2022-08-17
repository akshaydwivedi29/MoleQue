import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient) { }

  signUp(users:any) {
    return this.http.post('http://localhost:3000/users/signup', users)
  }

  login(user:any) {
    return this.http.post('http://localhost:3000/users/login', user)
  }

  generateOTP(mobile:any) {
    return this.http.post('http://localhost:3000/generateOTP/', {mobile})
  }

  loginWithOtp(data:any) {
    return this.http.post('http://localhost:3000/generateOTP/LoginOTP', data )
  }
}
