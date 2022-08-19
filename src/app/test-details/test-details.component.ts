import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { TestList, TestsService } from '../header/tests.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css'],
})
export class TestDetailsComponent implements OnInit {
  testId: any;
  obj: any;
  toggleTab: boolean = false;
  canAddToCart: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private testsService: TestsService,
    private cartService: CartService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.testId = params.get('Id');
      this.getData();
    });
  }

  ngOnInit(): void {}


  getData() {
    this.testsService.getTestDetail(this.testId.trim()).subscribe((results: any) => {
      this.obj = results;
      this.canAddToCart = !this.cartService.isAlreadyAddedInCart(
        this.obj
      );
    });
  }

  changeTab() {
    this.toggleTab = !this.toggleTab;
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
    this.canAddToCart = !this.cartService.isAlreadyAddedInCart(item);
  }
}
