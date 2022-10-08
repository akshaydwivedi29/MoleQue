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
  logInError: boolean = false;
  unregMobile: boolean = false;
  showOTP: boolean = false;
  showPassword: boolean = false;
  showSpinner: boolean = false;
  invalidOtp: boolean = false;
  blur_bg: boolean = false;
  logInForm: FormGroup;
  otpForm: FormGroup;
  loginData!: { number: string; password: string; };
  number: string = '';
  otpCode: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router
  ) {
    this.logInForm = this.formBuilder.group({
      number: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9]).{6,}$'),
        ],
      ],
    });

    this.otpForm = this.formBuilder.group({
      otpCode: ['', [Validators.required]],
    });

  }

  ngOnInit(): void { }

  password() {
    this.showPassword = !this.showPassword;
  }

  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  login() {
    this.loginData = this.logInForm.value;
    this.showSpinner = true;
    this.blur_bg = true;
    this.loginService.login(this.loginData).subscribe((res: any) => {
      if (res.length == 1) {
        this.router.navigate(['dashboard'], {
          replaceUrl: true,
        });
        localStorage.setItem('id', res[0]?._id);
      }
    },
      (err) => {
        this.logInError = true;
        this.showSpinner = false;
        this.blur_bg = false;
        setTimeout(() => {
          this.logInError = false;
        }, 5000);
      });
  }

  loginWithOtp() {
    this.number = this.logInForm.value.number;
    this.loginService.generateOTP(this.number).subscribe((res: any) => {
      this.showOTP = true;
    },
      (err) => {
        this.unregMobile = true;
        setTimeout(() => {
          this.unregMobile = false;
        }, 5000);
      }
    );
  }

  submitOtp(otp1: any, otp2: any, otp3: any, otp4: any, otp5: any, otp6: any) {
    this.otpCode = otp1.value + otp2.value + otp3.value + otp4.value + otp5.value + otp6.value;
    this.loginService.loginWithOtp({ mobile: this.number, otp: this.otpCode }).subscribe((res: any) => {
      if (res) {
        this.router.navigate(['dashboard'], {
          replaceUrl: true,
        });
        localStorage.setItem('id', res._id);
      }
    },
      (err) => {
        this.invalidOtp = true;
        setTimeout(() => {
          this.invalidOtp = false;
        }, 5000);
      });
  }

  forgotPage() {
    this.number = this.logInForm.value.number;
    this.router.navigate(['/forgot-password', { number: this.number }]);
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
