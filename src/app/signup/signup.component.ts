import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  otpForm: FormGroup;
  signUpData!: { number: string };
  showSignUpError: boolean = false;
  showOTP: boolean = false;
  invalidOtp: boolean = false;
  number: string = '';
  otpCode: string = '';
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router,
    private cartService: CartService
  ) {
    this.signUpForm = this.fb.group({
      // name: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.minLength(3),
      //     Validators.pattern('[a-zA-Z0-9]*'),
      //   ],
      // ],
      number: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      // password: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
      //   ],
      // ],
    });

    this.otpForm = this.fb.group({
      otpCode: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  register() {
    this.number = this.signUpForm.value.number;
    this.signUpData = this.signUpForm.value;
    this.loginService.signUp(this.signUpData).subscribe(
      (res: any) => {
        this.number = res.number;
        this.userId = res._id;
        this.showOTP = true;
        this.loginService.generateOTP(this.number).subscribe();
      },
      (err) => {
        this.showSignUpError = true;
        setTimeout(() => {
          this.showSignUpError = false;
        }, 5000);
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

  submitOtp(otp1: HTMLInputElement, otp2: HTMLInputElement, otp3: HTMLInputElement, otp4: HTMLInputElement, otp5: HTMLInputElement, otp6: HTMLInputElement) {
    this.otpCode = otp1.value + otp2.value + otp3.value + otp4.value + otp5.value + otp6.value;
    this.loginService.loginWithOtp({ otp: this.otpCode, mobile: this.number }).subscribe((res: any) => {
      localStorage.setItem('id', res._id);
      this.cartService.loadCart()
      this.router.navigate(['/profile', { number: this.number, userId: this.userId }
      ]);
    },
      err => {
        this.invalidOtp = true;
        setTimeout(() => {
          this.invalidOtp = false;
        }, 5000);
      });
  }
}
