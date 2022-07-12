import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TestsService, TestList } from './tests.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 1500,
    autoplayTimeout: 7000,
    autoplayHoverPause: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
  serviceOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 1500,
    autoplayTimeout: 7000,
    autoplayHoverPause: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 4,
    nav: false,
  };

  testlist: Array<TestList> = [];
  hasQuery: Boolean = false;

  constructor(private testsService: TestsService) {}

  sendData(event: any) {
    let query: string = event.target.value;
    //Will match if query is nothing or is only spaces
    let matchSpaces: any = query.match(/\s*/);
    if (matchSpaces[0] === query) {
      this.testlist = [];
      this.hasQuery = false;
      return;
    }

    this.testsService.searchTestList(query.trim()).subscribe((results) => {
      this.testlist = results;
      this.hasQuery = true;
      console.log(results);
    });
  }

  ngOnInit(): void {}
}
