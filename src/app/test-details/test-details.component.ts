import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  session: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testsService: TestsService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.searchName = params.get('SearchText');
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

  changeTab() {
    this.toggleTab = !this.toggleTab;
  }

  routeData(testName: any) {
    this.router.navigate(['/cart', { testName: testName }]);
  }

  saveData() {
    let testlist = {
      testcode: 12,
      testname: '',
      price: '',
    };

    localStorage.setItem('session', JSON.stringify(testlist));
    console.log(localStorage.getItem('session'));
  }
}
