import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from '../services/cart.service';
import { TestsService } from '../services/tests.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css'],
})
export class TestDetailsComponent implements OnInit {
  testId: any;
  userId: any;
  obj: any;
  toggleTab = false;
  canAddToCart = true;
  showCartModal = false;

  constructor(
    private route: ActivatedRoute,
    private testsService: TestsService,
    private cartService: CartService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.testId = params.get('Id');
      this.getData();
    });
    this.userId = localStorage.getItem('id');
  }

  ngOnInit(): void {}

  getData() {
    this.testsService.getTestDetail(this.testId).subscribe((results: any) => {
      this.obj = results;
      this.canAddToCart = !this.cartService.isAlreadyAddedInCart(this.obj);
    });
  }

  changeTab() {
    this.toggleTab = !this.toggleTab;
  }

  hideModal() {
    this.showCartModal = false;
  }

  addToCart(item: any) {
    if (this.userId) {
      this.cartService
        .addToCart({ userId: this.userId, testDetail: item })
        .subscribe((res) => {
          console.log(res);
        });
      this.canAddToCart = !this.cartService.isAlreadyAddedInCart(item);
    } else {
      this.cartService.addToCartLS(item);
      this.canAddToCart = !this.cartService.isAlreadyAddedInCart(item);
    }

    this.showCartModal = true;
  }
}
