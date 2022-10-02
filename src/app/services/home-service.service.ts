import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeServiceService {
  constructor(private http: HttpClient) {}

  checkReport(data: any) {
    return this.http.post(`${environment.serverURL}testReport`, data);
  }

  queryForm(data: any) {
    return this.http.post(`${environment.serverURL}queryForm/form`, data)
  }

  inquiryForm(data: any) {
    return this.http.post(`${environment.serverURL}Form/inquiryForm`, data)
  }

  getNumber(data: any) {
    return this.http.post(`${environment.serverURL}getCall/number`, data)
  }
}
