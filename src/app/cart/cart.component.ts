import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  testlist: any;
  toggleTab: boolean = false;
  totalCartValue: number = 0;
  userId: any;

  constructor(private cartService: CartService) {
    this.userId = localStorage.getItem('id')
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.cartService.getItems(this.userId).subscribe(res => {
      this.testlist = res;
      this.testlist.forEach((element: any) => {
        this.totalCartValue += parseFloat(element.testDetail.price);
      });
    });
  }

  removeItem(testId: any) {
    this.cartService.removeItem(testId._id).subscribe();
    this.testlist.forEach((element: any) => {
      this.totalCartValue -= parseFloat(element.testDetail.price);

    })
  }

  clearCart() {
    this.cartService.clearCart(this.userId).subscribe(res => {
      console.log(res)
    });
  }
}
