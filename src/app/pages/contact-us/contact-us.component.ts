import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  queryForm: FormGroup;
  queryValue: any;

  constructor(private fb: FormBuilder, private loginService: LoginServiceService) {
    this.queryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z0-9]*'),]],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.maxLength(10)]],
      option: ['', [Validators.required,]],
      message: ['', [Validators.required,]],
    })
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.queryValue = this.queryForm.value;
    const userId = localStorage.getItem('id');
    if (userId && this.queryForm.valid) {
      this.queryValue.userId = userId;
      this.loginService.queryForm(this.queryValue).subscribe(res => {
        this.queryForm.reset();
      })
    }
    else if(this.queryForm.valid){
      this.loginService.queryForm(this.queryValue).subscribe(res => {
        this.queryForm.reset();
      })
    }
    else{
      alert('something went wrong')
    }
  }

}
