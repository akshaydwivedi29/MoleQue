import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestsService } from '../header/tests.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  testlist: any;
  testDetail: any;
  toggleTab: boolean = false;
  totalCartValue: number = 0;
  userId: any;

  constructor(
    private router: Router,
    private cartService: CartService,
    private testService: TestsService
  ) {
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

  getAllTestDetail() {
    this.cartService.getAllTestDetail().subscribe(res => {
      this.testDetail = res;
    })
  }

  openRequestPage(test: any) {
    this.testService.getTestDetail(test._id).subscribe();
    this.router.navigate(['/test-details', { Id: test._id }])
  }

  addToCart(item: any) {
    this.cartService.addToCart({ userId: this.userId, testDetail: item }).subscribe();
  }
}
