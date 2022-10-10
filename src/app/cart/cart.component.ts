import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { TestList } from '../services/tests.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  testlist: TestList[] = [];
  totalCartValue: number = 0;
  userId: string = '';
  itemCount: number = 0;
  cartCount: any;

  constructor(private cartService: CartService, private router: Router) {
    this.cartService.events.subscribe((res: any) => {
      this.itemCount = parseInt(res);
      this.loadData()
    });
    this.userId = localStorage.getItem('id') || '';
  }

  ngOnInit(): void {
    this.loadData();
  }

  /* async getCart() {
    this.cartCount = this.cartService.getItems();
    this.itemCount = this.cartCount.length;
  } */


  loadData() {
    this.testlist = this.cartService.getItems();
    this.totalCartValue = this.cartService.getTotalCartValue();
  }

  removeItem(test: any) {
    this.cartService.removeItem(test);
    this.loadData
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadData();
  }

  openPrescription(event: Event) {
    this.router.navigate(['/book-test', { pre: event.type }])
  }
}
