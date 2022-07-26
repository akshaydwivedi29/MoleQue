import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../services/cart.service';
import { TestList, TestsService } from '../services/tests.service';

@Component({
  selector: 'app-book-test',
  templateUrl: './book-test.component.html',
  styleUrls: ['./book-test.component.css'],
})
export class BookTestComponent implements OnInit {
  id: any = 'allTest';
  userId: string = '';
  testList: TestList[] = [];
  datePickerConfig: Partial<BsDatepickerConfig>;
  modal: boolean = false;

  offerOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 7000,
    autoplayHoverPause: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 2,
    nav: false,
  };

  customOptions: OwlOptions = {
    loop: true,
    // autoplay: true,
    // autoplaySpeed: 1500,
    // autoplayTimeout: 7000,
    // autoplayHoverPause: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    items: 5,
    nav: true,
  };

  constructor(
    private testService: TestsService,
    private router: Router,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
    // Datepicker starts
    this.datePickerConfig = Object.assign(
      {},
      { containerClass: 'theme-dark-blue' }
    );
    // Datepicker ends

    this.userId = localStorage.getItem('id') || '';
    this.getTestList();
  }

  ngOnInit(): void {
    const pre = this.route.snapshot.params['pre'];
    const pack = this.route.snapshot.params['pack'];
    if (pre) {
      this.id = 'prescription';
    } else if (pack) {
      this.id = 'packages';
    }
  }

  searchTest(event: Event) {
    let query = (event.target as HTMLInputElement).value;
    if (!query || query.length < 1) {
      return;
    }
    this.testService.searchTestList(query).subscribe((res: TestList[]) => {
      this.testList = res;
    });
  }

  tabChange(ids: string) {
    this.id = ids;
  }

  openRequestPage(test: TestList) {
    this.testService.getTestDetail(test?._id).subscribe(() => {
      this.router.navigate(['/test-details', { Id: test._id }]);
    });
  }

  addToCart(item: TestList) {
    this.cartService.addToCart(item);
    this.modal = true;
  }

  getTestList() {
    this.cartService.getAllTestDetail().subscribe((res: TestList[]) => {
      this.testList = res;
    });
  }

  canAddToCart(item: TestList) {
    return this.cartService.isAlreadyAddedInCart(item);
  }
}
