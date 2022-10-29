import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { TestList } from '../services/tests.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css'],
})
export class CartModalComponent implements OnInit {
  testList: TestList[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItem();
   }

  getCartItem() {
    this.testList = this.cartService.getItems();
  }
}
