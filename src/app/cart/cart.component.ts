import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TestList, TestsService } from '../header/tests.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  searchName: any;
  testlist: Array<TestList> = [];
  toggleTab: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private testsService: TestsService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.searchName = params.get('testName');
      this.getData();
    });
  }

  ngOnInit(): void {
    console.log('init');
  }

  getData() {
    this.testsService
      .searchTestList(this.searchName.trim())
      .subscribe((results: TestList[]) => {
        this.testlist = results;

        console.log(results);
      });
  }
}
