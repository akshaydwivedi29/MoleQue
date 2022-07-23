import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestList, TestsService } from '../header/tests.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css'],
})
export class TestDetailsComponent implements OnInit {
  searchName: any;
  testlist: Array<TestList> = [];
  constructor(
    private route: ActivatedRoute,
    private testsService: TestsService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.searchName = this.route.snapshot.params['SearchText'];
    });
  }

  ngOnInit(): void {
    this.getData();
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
