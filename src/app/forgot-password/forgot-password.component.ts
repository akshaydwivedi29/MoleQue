import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPswdService } from '../services/forgot-pswd.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  show: boolean = false;
  showError: boolean = false;
  showPassword: boolean = false;
  mobileNumber: FormGroup;
  mobile: string = '';
  otp: FormGroup;
  code: string = '';
  number: string='';
  newPassword: string = '';

  constructor(
    private forgotPwdService: ForgotPswdService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.mobileNumber = this.fb.group({
      number: ['', [Validators.required, Validators.maxLength(10),Validators.minLength(10)]],
    });

    this.otp = this.fb.group({
      otpCode: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9]).{6,}$'),
        ],
      ],
    });

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

  ngOnInit(): void {
    this.number = this.route.snapshot.params['number'];
    this.mobileNumber.patchValue({ number: this.number });
  }

  verify() {
    this.mobile = this.mobileNumber.value.number;
    this.number = this.mobile
    this.forgotPwdService.generateOTP(this.mobile).subscribe(
      (res) => { },
      (err) => { }
    );
    this.show = true;
  }

  submit(otp1: HTMLInputElement, otp2: HTMLInputElement, otp3: HTMLInputElement, otp4: HTMLInputElement, otp5: HTMLInputElement, otp6: HTMLInputElement) {
    this.newPassword = this.otp.value.newPassword;
    this.code = otp1.value + otp2.value + otp3.value + otp4.value + otp5.value + otp6.value;
    this.forgotPwdService.generateNewPassword({ mobile: this.mobile, otpCode: this.code, newPassword: this.newPassword }).subscribe((res) => {
      this.router.navigate(['login']);
    },
      (err) => {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 5000);
      });
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
}
