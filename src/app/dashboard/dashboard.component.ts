import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId: any;
  userDetail: any;

  constructor(private loginService: LoginServiceService, private router: Router) {
    this.userId = localStorage.getItem('id')
    this.loginService.getUserDetail(this.userId).subscribe(res => {
      this.userDetail = res
    })
  }

  ngOnInit(): void {
  }

  editInfo(ev: Event) {
    this.router.navigate(['/profile', { edit: ev.type, id: this.userDetail._id }])
  }

}
