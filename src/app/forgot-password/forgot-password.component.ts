import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPswdService } from './forgot-pswd.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  show: boolean = false;
  showAlert: boolean = false;
  mobileNumber!: FormGroup;
  mobile: any;
  otp!: FormGroup;
  code: any;
  number: string = "";

  constructor(private forgotPwdService: ForgotPswdService, private fb: FormBuilder, private router
    : Router) {

    this.mobileNumber = this.fb.group({
      number: ['', [Validators.required, Validators.maxLength(10)]],
    });

    this.otp = this.fb.group({
      otpCode: ['', [Validators.required, Validators.maxLength(6)]],
      newPassword: ['', ([Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')])]
    });

    this.number = history.state.data;
  }

  ngOnInit(): void {
  }

  next() {
    this.mobile = this.mobileNumber.value.number;
    // request otp from backend
    this.forgotPwdService.generateOTP(this.mobile).subscribe((res) => { }, (err) => { });
    this.show = true;
  }

  submit() {
    this.code = this.otp.value;
    this.forgotPwdService.generateNewPassword({ ...this.code, mobile: this.mobile }).subscribe();
    this.otp.reset();
    this.showAlert = true;
    this.router.navigate(['login'])
  }

  move(event: any, previous: any, current: any, next: any) {
    let length = current.value.length;
    let maxLength = current.getAttribute('maxlength');
    if(length == maxLength){
      if(next != ""){
        next.focus();
      }
    }
    if(event.key === "Backspace"){
      if(previous != ""){
        previous.focus();
      }
    }
  }

}
