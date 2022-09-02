import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  open: any;
  id: any = 'profile';
  profileForm!: FormGroup;
  submitted: boolean = false;
  datePickerConfig: Partial<BsDatepickerConfig>;
  constructor(private fb: FormBuilder) {
    // Datepicker starts
    this.datePickerConfig = Object.assign(
      {},
      { containerClass: 'theme-dark-blue' }
    );
    // Datepicker ends

    this.profileForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z0-9]*'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z0-9]*'),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z0-9]*'),
        ],
      ],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  ngOnInit(): void {}

  tabChange(ids: any) {
    this.id = ids;
  }

  toggleForm(opened: any) {
    this.open = opened;
  }
  onSubmit() {
    this.submitted = true;

    // stop the process here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }

    alert('SUCCESS!!');
  }
}
