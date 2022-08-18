import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPswdService {

  constructor(private http: HttpClient) { }

  generateOTP(mobile: string) {
    return this.http.post(`${environment.serverURL}generateOTP/`, { mobile })
  }

  generateNewPassword(data:any) {
    return this.http.post(environment.serverURL.concat('generateOTP/getOTP'), data )
  }

}
