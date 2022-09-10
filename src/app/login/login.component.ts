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
  invalidOtp: boolean = false;
  logInForm: FormGroup;
  otpForm: FormGroup;
  loginData: {} = {};
  number: string = '';
  otpCode: string = '';

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
      otpCode: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  login() {
    this.loginData = this.logInForm.value;
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
        setTimeout(() => {
          this.logInError = false;
        }, 10000);
      })
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
        }, 10000);
      }
    );
  }

  submitOtp(otp1: any, otp2: any, otp3: any, otp4: any, otp5: any, otp6: any) {
    this.otpCode = otp1.value + otp2.value + otp3.value + otp4.value + otp5.value + otp6.value;
    this.loginService.loginWithOtp({mobile: this.number, otp: this.otpCode }).subscribe((res: any) => {
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
        }, 10000);
      });
  }

  forgotPage() {
    this.number = this.logInForm.value.number;
    this.router.navigate(['/forgot-password',{number:this.number}]);
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
