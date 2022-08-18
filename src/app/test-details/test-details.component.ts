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
  searchName: any;
  testlist: Array<TestList> = [];
  toggleTab: boolean = false;
  canAddToCart: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private testsService: TestsService,
    private cartService: CartService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.searchName = params.get('SearchText');
      this.getData();
    });
  }

  ngOnInit(): void {}

  getData() {
    this.testsService
      .searchTestList(this.searchName.trim())
      .subscribe((results: TestList[]) => {
        this.testlist = results;
        this.canAddToCart = !this.cartService.isAlreadyAddedInCart(
          this.testlist[0]
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
