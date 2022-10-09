import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { userProfile } from '../dashboard/dashboard.model';

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

  addAddress(userId: string, address: any) {
    return this.http.post(`${environment.serverURL}users/${userId}/address`, address)
  }

  updateAddress(userId: string, address: any, index: number) {
    return this.http.patch(`${environment.serverURL}users/${userId}/address/${index}`, address)
  }

  deleteAddress(userId: string, index: number) {
    return this.http.delete(`${environment.serverURL}users/${userId}/address/${index}`)
  }

  addFamilyMember(userId: string, member: any) {
    return this.http.post(`${environment.serverURL}users/${userId}/addFamilyMember`, member)
  }

  updateFamilyMember(userId: string, member: any, index: any) {
    return this.http.patch(`${environment.serverURL}users/${userId}/familyMember/${index}`, member)
  }

  deleteFamilyMember(userId: string, index: number) {
    return this.http.delete(`${environment.serverURL}users/${userId}/familyMember/${index}`)
  }

  getUserDetail(userId: string) {
    return this.http.get<userProfile>(`${environment.serverURL}users/userById/${userId}`)
  }


}
