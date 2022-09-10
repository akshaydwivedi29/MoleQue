import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  open: any;
  id: any = 'profile';
  profileForm!: FormGroup;
  addressForm!: FormGroup;
  familyMemberForm!: FormGroup;
  submitted: boolean = false;
  edit: any;
  number: string = '';
  userId: string = '';
  userDetail: any;
  Id: any;
  passwordError: boolean = false;
  profileDetail: any;
  address: any;
  addressDetail: any;
  familyMember: any;
  familyMemberProfile: any;
  familyMemberDOB: any;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  mobile: string = '';
  gender: string = '';
  password: string = '';
  confirmPassword: string = '';
  DOB!: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(private fb: FormBuilder, private loginService: LoginServiceService, private route: ActivatedRoute, private router: Router) {
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
          Validators.email,
        ],
      ],
      mobile: ['', [Validators.required, Validators.maxLength(10)]],
      gender: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),],],
      confirm_password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),],],
      acceptCheckbox: ['', [Validators.required,]],
    });

    this.addressForm = this.fb.group({
      addressLine1: ['', [Validators.required,]],
      addressLine2: ['', [Validators.required,]],
      city: ['', [Validators.required,]],
      state: ['', [Validators.required,]],
      pinCode: ['', [Validators.required,]],
      landmark: ['', [Validators.required,]]
    });

    this.familyMemberForm = this.fb.group({
      memberFirstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z0-9]*'),
        ],
      ],
      memberLastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z0-9]*'),
        ],
      ],
      relation: ['', [Validators.required]],
      memberMobile: ['', [Validators.required, Validators.maxLength(10)]],
      memberGender: ['', [Validators.required]],
      memberDOB: ['', [Validators.required]]
    });

    this.edit = this.route.snapshot.params['edit'];
    this.Id = this.route.snapshot.params['id'];
    this.getUserDetail();

  }

  ngOnInit(): void {
    this.number = this.route.snapshot.params['number'];
    this.userId = this.route.snapshot.params['userId'];
  }

  tabChange(ids: any) {
    this.id = ids;
  }

  toggleForm(opened: any) {
    this.open = opened;
  }
  // onSubmit() {
  //   this.submitted = true;

  //   // stop the process here if form is invalid
  //   if (this.profileForm.invalid) {
  //     return;
  //   }
  //   alert('SUCCESS!!');
  // }

  register(add: any) {
    this.profileDetail = this.profileForm.value;
    const password = this.profileDetail.password;
    const confirmPassword = this.profileDetail.confirm_password;

    if (password !== confirmPassword) {
      this.passwordError = true;
      setTimeout(() => {
        this.passwordError = false;
      }, 5000);
    }

    else if (this.userId && this.profileForm.valid) {
      this.loginService.updateUserProfile(this.userId, this.profileDetail).subscribe(res => { });
      this.tabChange(add)
      this.profileForm.reset();
      // this.router.navigate(['/login'])
    }

    else if (this.edit && this.profileForm.valid) {
      this.loginService.updateUserProfile(this.Id, this.profileDetail).subscribe();
      this.profileForm.reset();
      this.tabChange(add)
      // this.router.navigate(['/dashboard'])
    }
    else {
      alert('Something went wrong!')
    }
  }

  saveAddress() {
    this.address = this.addressForm.value;
    if (this.userId && this.addressForm.valid) {
      this.loginService.updateUserProfile(this.userId, { address: this.address }).subscribe(res => { });
      this.router.navigate(['/login'])
    }
    else if (this.edit && this.addressForm.valid) {
      this.loginService.updateUserProfile(this.Id, { address: this.address }).subscribe();
      this.addressForm.reset();
      this.router.navigate(['/dashboard'])
    }
    else {
      alert('Something went wrong!')
    }
  }

  addMember() {
    this.familyMember = this.familyMemberForm.value;
    if (this.userId && this.familyMemberForm.valid) {
      this.loginService.updateUserProfile(this.userId, { familyMember: this.familyMember }).subscribe(res => { });
      this.router.navigate(['/dashboard'])
    }
    else if (this.edit && this.familyMemberForm.valid) {
      this.loginService.updateUserProfile(this.Id, { familyMember: this.familyMember }).subscribe();
      this.familyMemberForm.reset();
      this.router.navigate(['/dashboard'])
    }
    else {
      alert('Something went wrong!')
    }
  }

  getUserDetail() {
    if (this.edit) {
      this.loginService.getUserDetail(this.Id).subscribe((res: any) => {
        this.userDetail = res;
        this.firstName = this.userDetail.firstName;
        this.lastName = this.userDetail.lastName;
        this.email = this.userDetail.email;
        this.number = this.userDetail.number;
        this.DOB = new Date(this.userDetail.DOB);
        this.gender = this.userDetail.gender;
        this.password = this.userDetail.password;
        this.confirmPassword = this.userDetail.password;
        this.addressDetail = this.userDetail.address;
        this.familyMemberProfile = this.userDetail.familyMember;
        this.familyMemberDOB = new Date(this.familyMemberProfile?.memberDOB)
      });
    }
  }
}
