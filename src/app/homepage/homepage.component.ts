import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeServiceService } from '../services/home-service.service';
import { LoginServiceService } from '../services/login-service.service';
import { TestList } from '../services/tests.service';
import { InquiryForm, TestReport } from './homepage.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  testReportForm: FormGroup;
  inquiryForm: FormGroup;
  mobileNumber: FormGroup;
  otpForm: FormGroup;
  inquiryValue!: InquiryForm;
  testReportValue!: TestReport;
  submitted: boolean = false;
  showAlert: boolean = false;
  blur_bg: boolean = false;
  blur_mobile_report: boolean = false;
  secure_login: boolean = false;
  invalidOtp: boolean = false;
  unregMobile: boolean = false;
  mobileReport: boolean = true;
  showPassword: boolean = false;
  finalCaptcha: string = '';
  number: string = '';
  otpCode: string = '';
  userId: string = '';
  
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
  testConOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 1500,
    autoplayTimeout: 7000,
    autoplayHoverPause: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 300,
    navText: ['', ''],
    // items: 3,
    nav: false,
    margin: 5,
    responsive: {
      0: {
        items: 2,
        margin: 15,
      },
      500: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  };

  constructor(
    private fb: FormBuilder,
    private homeService: HomeServiceService,
    private loginService: LoginServiceService,
    private router: Router
  ) {
    this.testReportForm = this.fb.group({
      visitId: ['', [Validators.required]],
      password: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
    });

    this.mobileNumber = this.fb.group({
      mobile: ['', [Validators.required]],
    });
    this.number = this.mobileNumber.value.mobile;

    this.otpForm = this.fb.group({
      otpCode: ['', [Validators.required]],
    });

    this.inquiryForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z]+[a-zA-Z]/),
        ],
      ],
      criticalIllness: ['', [Validators.required]],
      number: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });

    this.userId = localStorage.getItem('id') || '';
  }

  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  password() {
    this.showPassword = !this.showPassword;
  }

  submitInquiryForm() {
    this.submitted = true;
    this.inquiryValue = this.inquiryForm.value;
    if (this.userId && this.inquiryForm.valid) {
      this.inquiryValue.userId = this.userId;
      this.homeService.inquiryForm(this.inquiryValue).subscribe((res) => {
        this.inquiryForm.reset();
        this.submitted = false;
      });
    } else if (this.inquiryForm.valid) {
      this.homeService.inquiryForm(this.inquiryValue).subscribe((res) => {
        this.inquiryForm.reset();
        this.submitted = false;
      });
    }
  }

  ngOnInit(): void {
    this.generateCaptcha();
  }

  generateCaptcha() {
    let alpha = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      '!',
      '@',
      '#',
      '$',
      '%',
      '^',
      '&',
      '*',
      '+',
    ];
    let a = alpha[Math.floor(Math.random() * 71)];
    let b = alpha[Math.floor(Math.random() * 71)];
    let c = alpha[Math.floor(Math.random() * 71)];
    let d = alpha[Math.floor(Math.random() * 71)];
    let e = alpha[Math.floor(Math.random() * 71)];
    let f = alpha[Math.floor(Math.random() * 71)];
    this.finalCaptcha = a + b + c + d + e + f;
  }

  checkTestReport() {
    this.testReportValue = this.testReportForm.value;
    if (
      this.testReportValue &&
      this.finalCaptcha === this.testReportValue.captcha && this.userId
    ) {
      this.homeService.checkReport(this.testReportValue).subscribe((res) => {
        this.testReportForm.reset();
      });
    }
    else if (
      this.testReportValue &&
      this.finalCaptcha === this.testReportValue.captcha
    ) {
      this.homeService.checkReport(this.testReportValue).subscribe((res) => {
        this.testReportForm.reset();
      });
    }

    else if (this.finalCaptcha != this.testReportValue.captcha) {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    }
  }

  displayStyle = 'none';

  openPopup() {
    if (this.userId) {
      this.router.navigate(['/book-test']);
    } else {
      this.displayStyle = 'flex';
      this.blurBody();
    }
  }
  closePopup() {
    this.displayStyle = 'none';
    this.sharpBody();
  }

  blurBody() {
    this.blur_bg = true;
  }
  sharpBody() {
    this.blur_bg = false;
  }

  openPrescription(event: Event) {
    this.router.navigate(['/book-test', { pre: event.type }]);
  }

  openPackage(event: Event) {
    this.router.navigate(['/book-test', { pack: event.type }]);
  }

  getOTP() {
    this.number = this.mobileNumber.value.mobile;
    this.loginService.generateOTP(this.number).subscribe(
      (res) => {
        this.secure_login = true;
      },
      (err) => {
        this.unregMobile = true;
        setTimeout(() => {
          this.unregMobile = false;
        }, 5000);
      }
    );
  }

  resendOtp() {
    this.loginService.generateOTP(this.number).subscribe();
  }

  submitOtp(otp1: HTMLInputElement, otp2: HTMLInputElement, otp3: HTMLInputElement, otp4: HTMLInputElement, otp5: HTMLInputElement, otp6: HTMLInputElement) {
    this.otpCode =
      otp1.value +
      otp2.value +
      otp3.value +
      otp4.value +
      otp5.value +
      otp6.value;
    this.loginService
      .loginWithOtp({ mobile: this.number, otp: this.otpCode })
      .subscribe(
        (res: any) => {
          if (res) {
            this.router.navigate(['/book-test'], {
              replaceUrl: true,
            });
            localStorage.setItem('id', res._id);
          }
        },
        (err) => {
          this.invalidOtp = true;
          setTimeout(() => {
            this.invalidOtp = false;
          }, 10000);
        }
      );
  }

  move(event: KeyboardEvent, previous: any, current: any, next: any) {
    let length = current.value.length;
    let maxLength = current.getAttribute('maxlength');
    if (length == maxLength) {
      if (next != '') {
        next.focus();
      }
    }
    if (event.key === 'Backspace') {
      if (previous != '') {
        previous.focus();
      }
    }
  }

  showClipBoard() {
    this.mobileReport = !this.mobileReport;
    this.blur_mobile_report = true;
  }

  hideClipBoard() {
    this.mobileReport = !this.mobileReport;
    this.blur_mobile_report = false;
  }
}
