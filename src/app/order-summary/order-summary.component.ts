import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  orderId: string = '';
  userOrderDetail: any;
  userCart: any;
  totalCartValue: any;

  constructor(private cartService: CartService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderId = this.activateRoute.snapshot.params['orderId'];
    this.getOrderDetail();
  }

  getOrderDetail() {
    this.cartService.getOrderByUserId(this.orderId).subscribe(res => {
      this.userOrderDetail = res;
      this.userCart = this.userOrderDetail[0].cart;
    })
  }

  
}
