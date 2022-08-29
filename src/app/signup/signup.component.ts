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
  signUpData: any;

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
  }

  ngOnInit(): void {}

  signUp() {
    this.signUpData = this.signUpForm.value;
    this.loginService.signUp(this.signUpData).subscribe(
      (res) => {
        this.router.navigate(['/login']);
        this.signUpForm.reset();
      },
      (err) => {
        this.showSignUpError = true;
        this.signUpForm.reset();
      }
    );
  }
}
