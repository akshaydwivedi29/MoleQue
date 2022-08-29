import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  showlogInError: boolean = false;
  showlogInWithOtpError: boolean = false;
  showOTP: boolean = false;
  logInForm!: FormGroup;
  otpForm!: FormGroup;
  loginData: any;
  number: string = '';
  otpCode: any;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router
  ) {
    this.logInForm = this.formBuilder.group({
      number: ['', [Validators.required, Validators.maxLength(10)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
        ],
      ],
    });

    this.otpForm = this.formBuilder.group({
      otpCode: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  ngOnInit(): void {}

  login() {
    this.loginData = this.logInForm.value;
    this.loginService.login(this.loginData).subscribe((res: any) => {
      if (res.length == 1) {
        this.router.navigate(['dashboard'], {
          replaceUrl: true,
        });
      } else {
        this.showlogInError = true;
      }

      localStorage.setItem('id', res[0]._id);
    });
  }

  loginWithOtp() {
    this.number = this.logInForm.value.number;
    this.loginService.generateOTP(this.number).subscribe(
      (res) => {
        this.showOTP = true;
      },
      (err) => {
        this.showlogInWithOtpError = true;
      }
    );
  }

  submitOtp() {
    this.otpCode = this.otpForm.value.otpCode;
    this.loginService
      .loginWithOtp({ ...this.otpCode, mobile: this.number })
      .subscribe();
    this.router.navigate(['dashboard']);
  }

  forgotPage() {
    this.number = this.logInForm.value.number;
    this.router.navigate(['/forgot-password'], {
      state: { data: this.number },
    });
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
}
