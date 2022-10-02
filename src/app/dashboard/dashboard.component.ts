import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';
import { userProfile } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId: string = '';
  userDetail!: userProfile;

  constructor(private loginService: LoginServiceService, private router: Router) {
    this.userId = localStorage.getItem('id') || '';
    this.loginService.getUserDetail(this.userId).subscribe((res:userProfile) => {
      this.userDetail = res;
    })
  }

  ngOnInit(): void {
  }

  editInfo(ev: Event) {
    this.router.navigate(['/profile'])
  }

}
