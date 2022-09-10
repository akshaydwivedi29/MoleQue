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
  mobileNumber!: FormGroup;
  mobile: string = '';
  otp!: FormGroup;
  code: string = '';
  number: string = '';
  newPassword: string = '';

  constructor(
    private forgotPwdService: ForgotPswdService,
    private fb: FormBuilder,
    private router: Router,
    private route :ActivatedRoute
  ) {
    this.mobileNumber = this.fb.group({
      number: ['', [Validators.required, Validators.maxLength(10)]],
    });

    this.otp = this.fb.group({
      otpCode: ['', [Validators.required, Validators.maxLength(6)]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
        ],
      ],
    });

  }

  ngOnInit(): void {
    this.number = this.route.snapshot.params['number'];
   }

  verify() {
    this.mobile = this.mobileNumber.value.number;
    this.number = this.mobile;
    this.forgotPwdService.generateOTP(this.mobile).subscribe(
      (res) => { },
      (err) => { }
    );
    this.show = true;
  }

  submit(otp1: any, otp2: any, otp3: any, otp4: any, otp5: any, otp6: any) {
    this.newPassword = this.otp.value.newPassword;
    this.code = otp1.value + otp2.value + otp3.value + otp4.value + otp5.value + otp6.value;
    this.forgotPwdService.generateNewPassword({ mobile: this.mobile, otpCode: this.code, newPassword: this.newPassword }).subscribe((res) => {
      this.router.navigate(['login']);
    },
      (err) => {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 10000);
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
