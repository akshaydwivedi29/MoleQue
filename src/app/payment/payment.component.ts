import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  totalCartValue: number = 0;
  userCart: any;
  selectedMethod: boolean = false;
  id: string = 'card';

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getOrderDetail();
  }

  getOrderDetail() {
    const orderId = localStorage.getItem('orderId') || '';
    this.cartService.getOrderByUserId(orderId).subscribe((res: any) => {
      this.userCart = res[0].cart;
      this.userCart.forEach((element: any) => {
        this.totalCartValue += parseFloat(element.price);
      });
    })
  }

  toggleSelectMethod(ids:string){
    this.id = ids;
  }

  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
