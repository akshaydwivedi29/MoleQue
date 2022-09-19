import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../services/cart.service';
import { TestsService } from '../services/tests.service';

@Component({
  selector: 'app-book-test-page',
  templateUrl: './book-test-page.component.html',
  styleUrls: ['./book-test-page.component.css']
})
export class BookTestPageComponent implements OnInit {

  id: any = 'allTest';
  userId: any;
  testList: any;
  prescriptionForm: FormGroup;
  canAddToCart: boolean[] = [false];
  datePickerConfig: Partial<BsDatepickerConfig>;
  loader: boolean = true;
  prescriptionFormValue: any;

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
    items: 1,
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
    private route :ActivatedRoute,
    private cartService: CartService,
    private fb: FormBuilder
  ) {
    // Datepicker starts
    this.datePickerConfig = Object.assign(
      {},
      { containerClass: 'theme-dark-blue' }
    );
    // Datepicker ends

    this.prescriptionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z0-9]*')]],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      upload: ['', [Validators.required]],
    });

    this.userId = localStorage.getItem('id');
    this.getTestList();
  }

  ngOnInit(): void {
    const pre = this.route.snapshot.params['pre'];
    const pack = this.route.snapshot.params['pack'];
    if(pre){
      this.id = 'prescription';
    }
    else if(pack){
      this.id = 'packages';

    }
  }

  tabChange(ids: any) {
    this.id = ids;
  }

  openRequestPage(test: any) {
    this.testService.getTestDetail(test._id).subscribe();
    this.router.navigate(['/test-details', { Id: test._id }]);
  }

  addToCart(item: any) {
    if (this.userId) {
      this.cartService
        .addToCart({ userId: this.userId, testDetail: item })
        .subscribe();
      this.canAddToCart[item._id] = !this.cartService.isAlreadyAddedInCart(
        item._id
      );
    } else {
      this.cartService.addToCartLS(item);
      this.canAddToCart[item._id] = !this.cartService.isAlreadyAddedInCart(
        item._id
      );
    }
  }

  getTestList() {
    this.cartService.getAllTestDetail().subscribe((res) => {
      if (res) {
        this.loader = false;
      }
      this.testList = res;
    });
  }

  submitForm() {
    this.prescriptionFormValue = this.prescriptionForm.value;
  }

  sort(event: any) {
    if (event.target.value === 'l2h') {
      this.testList.sort((a: any, b: any) => {
        return a.price - b.price
      });
    }
    else if (event.target.value === 'h2l') {
      this.testList.sort((a: any, b: any) => {
        return b.price - a.price
      });
    }
    else if (event.target.value === 'a2z') {
      this.testList.sort((a: any, b: any) => {
        return a.testname.toLowerCase().localeCompare(b.testname.toLowerCase())
      });
    }
    else if (event.target.value === 'z2a') {
      this.testList.sort((a: any, b: any) => {
        return b.testname.toLowerCase().localeCompare(a.testname.toLowerCase())
      });
    }
  }

}
