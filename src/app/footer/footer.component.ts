import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeServiceService } from '../services/home-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  open = true;
  toggler = true;
  getCallForm:FormGroup;
  submitted:boolean = false;
  getNumber:any;

  constructor(private fb:FormBuilder,private homeService:HomeServiceService) {
    this.getCallForm = this.fb.group({
      number: ['', [Validators.required, Validators.maxLength(10)]]
    });
  }

  toggleGetCall(): void {
    this.open = !this.open;
    this.toggler = !this.toggler;
  }

  ngOnInit(): void {}

  
  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

submitNumber() {
  this.submitted = true;
  this.getNumber = this.getCallForm.value;
  const userId = localStorage.getItem('id');
  this.getNumber.userId = userId;
  if (userId && this.getCallForm.valid) {
    this.homeService.getNumber(this.getNumber).subscribe((res) => {
      this.getCallForm.reset();
      this.submitted = false;
    });
  } else if (this.getCallForm.valid) {
    this.homeService.getNumber(this.getNumber).subscribe((res) => {
      this.getCallForm.reset();
      this.submitted = false; 
    });
  } 
}
}
