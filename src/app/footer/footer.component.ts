import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  open = true;
  toggler = true;

  constructor() {}

  toggleGetCall(): void {
    this.open = !this.open;
    this.toggler = !this.toggler;
  }

  ngOnInit(): void {}
}
