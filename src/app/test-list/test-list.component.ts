import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { TestsService } from '../header/tests.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

  userId: any;
  testList: any;

  constructor(private testService: TestsService, private router: Router, private cartService: CartService) {
    this.userId = localStorage.getItem('id');
    this.getTestList();
  }

  ngOnInit(): void {
  }

  openRequestPage(test: any) {
    this.testService.getTestDetail(test._id).subscribe();
    this.router.navigate(['/test-details', { Id: test._id }])
  }

  addToCart(item: any) {
    this.cartService.addToCart({ userId: this.userId, testDetail: item }).subscribe();
  }

  getTestList() {
    this.cartService.getAllTestDetail().subscribe(res => {
      this.testList = res;
    })
  }
}