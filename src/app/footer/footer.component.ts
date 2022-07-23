import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  open = true;
  toggler = true;
  toggleGetCall(): void {
    this.open = !this.open;
    this.toggler = !this.toggler;
  }

  constructor() {}

  ngOnInit(): void {}
}
