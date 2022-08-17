import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotPswdService {

  constructor(private http: HttpClient) { }

  generateOTP(mobile: string) {
    return this.http.post('http://localhost:3000/generateOTP/', { mobile })
  }

  generateNewPassword(data:any) {
    return this.http.post('http://localhost:3000/generateOTP/getOTP', data )
  }

}
