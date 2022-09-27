import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeServiceService } from 'src/app/services/home-service.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  queryForm: FormGroup;
  queryValue: any;
  submitted:boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private homeService:HomeServiceService
  ) {
    this.queryForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z0-9]*'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      option: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

  ngOnInit(): void {}

  submitForm() {
    this.submitted = true;
    this.queryValue = this.queryForm.value;
    const userId = localStorage.getItem('id');
    this.queryValue.userId = userId;
    if (userId && this.queryForm.valid) {
      this.homeService.queryForm(this.queryValue).subscribe((res) => {
        this.queryForm.reset();
        this.submitted = false;
      });
    } else if (this.queryForm.valid) {
      this.homeService.queryForm(this.queryValue).subscribe((res) => {
        this.queryForm.reset();
        this.submitted = false; 
      });
    } 
  }
}
