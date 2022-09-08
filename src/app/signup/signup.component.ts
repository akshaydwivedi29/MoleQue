import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  showSignUpError: boolean = false;
  signUpForm!: FormGroup;
  otpForm!: FormGroup;
  signUpData: any;
  showOTP: boolean = false;
  invalidOtp: boolean = false;
  number: string = '';
  otpCode: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z0-9]*'),
        ],
      ],
      number: ['', [Validators.required, Validators.maxLength(10)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
        ],
      ],
    });

    this.otpForm = this.fb.group({
      otpCode: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  signUp() {
    this.number = this.signUpForm.value.number;
    this.signUpData = this.signUpForm.value;
    this.loginService.signUp(this.signUpData).subscribe(
      (res:any) => {
        this.number = res.number;
        this.showOTP = true;
        this.loginService.generateOTP(this.number).subscribe();
      },
      (err) => {
        this.showSignUpError = true;
        setTimeout(() => {
          this.showSignUpError = false;
        }, 10000);
      }
    );
  }

  move(event: any, previous: any, current: any, next: any) {
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

  submitOtp(otp1: any, otp2: any, otp3: any, otp4: any, otp5: any, otp6: any) {
    this.otpCode = otp1.value + otp2.value + otp3.value + otp4.value + otp5.value + otp6.value;
    this.loginService.loginWithOtp({ otp: this.otpCode, mobile: this.number }).subscribe((res: any) => {
      this.router.navigate(['login']);
    },
      err => {
        this.invalidOtp = true;
        setTimeout(() => {
          this.invalidOtp = false;
        }, 10000);
      });
  }
}
