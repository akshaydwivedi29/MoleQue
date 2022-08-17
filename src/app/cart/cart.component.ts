import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TestList, TestsService } from '../header/tests.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  searchName: any;
  testlist: Array<TestList> = [];
  toggleTab: boolean = false;
  session: any;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.testlist = this.cartService.getItems();
  }

  removeItem(item: any) {
    this.cartService.removeItem(item);
  }
}
