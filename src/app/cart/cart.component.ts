import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  testlist: any;
  totalCartValue = 0;
  userId: any;
  data: any;
  itemCount = 0;
  cartCount: any;

  constructor(private cartService: CartService) {
    this.cartService.events.subscribe((res: any) => {
      this.itemCount = parseInt(res);
    });
    this.userId = localStorage.getItem('id');
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
      this.data = res;
      console.log('loadData', this.testlist);
      this.testlist.forEach((element: any) => {
        this.totalCartValue += parseFloat(element.testDetail.price);
      });
    });
  }

  loadDataLS() {
    this.testlist = this.cartService.getItemsLS();
    console.log('loadDataLS', this.testlist);
    console.log(this.testlist.length);
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
}
