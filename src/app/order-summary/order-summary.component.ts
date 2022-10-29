import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserTestOrder } from '../cart/cart.model';
import { CartService } from '../services/cart.service';
import { TestList } from '../services/tests.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  orderId: string = '';
  userOrderDetail: UserTestOrder[]=[];
  userCart: TestList[]=[];
  totalCartValue: number = 0;

  constructor(private cartService: CartService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderId = localStorage.getItem('orderId') || '';
    this.getOrderDetail();
  }

  getOrderDetail() {
    this.cartService.getOrderByUserId(this.orderId).subscribe((res:UserTestOrder[]) => {
      console.log(res)
      this.userOrderDetail = res;
      this.userCart = this.userOrderDetail[0].cart;
      this.userCart.forEach((element: any) => {
        this.totalCartValue += parseFloat(element.price);
      });
    })
  }

}
