import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  id: any = 'profile';
  tabChange(ids: any) {
    this.id = ids;
  }

  open: any;
  toggleForm(opened: any) {
    this.open = opened;
  }
}
