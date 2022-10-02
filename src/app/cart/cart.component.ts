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
    });
    this.userId = localStorage.getItem('id') || '';
  }

  ngOnInit(): void {
    this.loadDataLS();
    this.getCart();
  }

  async getCart() {
    this.cartCount = this.cartService.getItemsLS();
    this.itemCount = this.cartCount.length;
  }

  loadData() {
    this.cartService.getItems(this.userId).subscribe((res: any) => {
      this.testlist = res;
      this.testlist.forEach((element: any) => {
        this.totalCartValue += parseFloat(element.testDetail.price);
      });
    });
  }

  loadDataLS() {
    this.testlist = this.cartService.getItemsLS();
    this.totalCartValue = this.cartService.getTotalCartValue();
  }

  removeItem(testId: any) {
    this.cartService.removeItem(testId._id).subscribe();
    this.cartService.removeItemLS(testId);
    this.testlist.forEach((element: any) => {
      this.totalCartValue -= parseFloat(element.testDetail.price);
    });
  }

  removeItemLS(item: any) {
    this.cartService.removeItemLS(item);
  }

  clearCartLS() {
    this.cartService.clearCartLS();
    this.getCart();
  }

  openPrescription(event: Event) {
    this.router.navigate(['/book-test', { pre: event.type }])
  }
}
