import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private testsService: TestsService ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.testId = params.get('Id');
      this.getData();
    });
  }

  ngOnInit(): void {
  }

  getData() {
    this.testsService.getTestDetail(this.testId.trim()).subscribe((results: any) => {
      this.obj = results;
    });
  }

  changeTab() {
    this.toggleTab = !this.toggleTab;
  }
}
