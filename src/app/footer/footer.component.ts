import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeServiceService } from '../services/home-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  open: boolean = true;
  toggler: boolean = true;
  getCallForm: FormGroup;
  submitted: boolean = false;
  getNumber: {number:string,userId:string} = {
    number: '',
    userId: ''
  };

  constructor(private fb: FormBuilder, private homeService: HomeServiceService, private router: Router) {
    this.getCallForm = this.fb.group({
      number: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]]
    });
  }

  toggleGetCall(): void {
    this.open = !this.open;
    this.toggler = !this.toggler;
  }

  ngOnInit(): void { }

  displayStyle = 'none';

  openPopup() {
    this.displayStyle = 'flex';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

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
    this.getNumber.userId = userId || '';
    if (userId && this.getCallForm.valid) {
      this.homeService.getNumber(this.getNumber).subscribe((res) => {
        console.log(res)
        this.openPopup();
        setTimeout(() => {
          this.displayStyle = 'none';
        }, 10000);
        this.getCallForm.reset();
        this.submitted = false;
      });
    } else if (this.getCallForm.valid) {
      this.homeService.getNumber(this.getNumber).subscribe((res) => {
        this.openPopup();
        setTimeout(() => {
          this.displayStyle = 'none';
        }, 10000);
        this.getCallForm.reset();
        this.submitted = false;
      });
    }
  }
}
