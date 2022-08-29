import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeServiceService } from '../services/home-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  finalCaptcha: string = '';
  testReportForm!: FormGroup;
  testReportValue: any;
  showAlert: boolean = false;
  blur_bg: boolean = false;
  secure_login: boolean = false;

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
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 4,
    nav: false,
    margin: 0,
  };

  constructor(
    private fb: FormBuilder,
    private homeService: HomeServiceService
  ) {
    this.testReportForm = this.fb.group({
      visitId: ['', [Validators.required]],
      password: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
    });
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
      this.finalCaptcha === this.testReportValue.captcha
    ) {
      this.homeService.checkReport(this.testReportValue).subscribe((res) => {
        this.testReportForm.reset();
      });
    } else if (this.finalCaptcha != this.testReportValue.captcha) {
      this.showAlert = true;
    }
  }

  displayStyle = 'none';

  openPopup() {
    this.displayStyle = 'flex';
    this.blurBody();
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

  submitOTP() {
    this.secure_login = true;
  }
}
