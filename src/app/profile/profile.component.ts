import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Address, FamilyMember, userProfile } from '../dashboard/dashboard.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  open: string = '';
  id: string = 'profile';
  userId: string = '';
  number: string = '';
  Id: string = '';
  profileForm: FormGroup;
  addressForm: FormGroup;
  familyMemberForm: FormGroup;
  submitted: boolean = false;
  show: boolean = false;
  showPassword: boolean = true;
  familyMemberIndex!: number;
  addressIndex!: number;
  passwordError: boolean = false;
  blur_bg: boolean = false;
  userDetail!: userProfile;
  profileDetail!: userProfile;
  addressValue!: Address;
  familyMemberValue!: FamilyMember;
  familyMember: FamilyMember[] = [];
  address: Address[] = [];
  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
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
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      gender: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
        ],
      ],
      confirm_password: [
        '',
        [
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
        ],
      ],
      acceptCheckbox: ['', [Validators.required]],
    });

    this.addressForm = this.fb.group({
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pinCode: ['', [Validators.required, Validators.maxLength(6),]],
      landmark: [''],
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
      memberMobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      memberGender: ['', [Validators.required]],
      memberDOB: ['', [Validators.required]],
    });

    this.Id = localStorage.getItem('id') || '';
  }

  ngOnInit(): void {
    this.number = this.route.snapshot.params['number'];
    this.userId = this.route.snapshot.params['userId'];
    this.profileForm.patchValue({number:this.number})
    this.getUserDetail();
    if (this.Id) {
      this.showPassword = false;
    }
  }

  tabChange(ids: any) {
    this.id = ids;
  }

  toggleForm(opened: any) {
    this.open = opened;
  }

  hideForm() {
    this.open = '';
    this.show = false;
  }

  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  register(add: any) {
    this.profileDetail = this.profileForm.value;
    const password = this.profileDetail.password;
    const confirmPassword = this.profileDetail.confirm_password;

    if (this.userId && password !== confirmPassword) {
      this.passwordError = true;
      setTimeout(() => {
        this.passwordError = false;
      }, 5000);
    }

    else if (this.userId && this.profileForm.valid) {
      this.loginService
        .updateUserProfile(this.userId, this.profileDetail)
        .subscribe((res) => { });
      this.profileForm.reset();
      this.tabChange(add);
      // this.router.navigate(['/login'])
    }

    else if (this.Id && this.profileForm.valid) {
      this.loginService
        .updateUserProfile(this.Id, this.profileDetail)
        .subscribe();
      this.profileForm.reset();
      this.tabChange(add);
      // this.router.navigate(['/dashboard'])
    }

    else {
      alert('Something went wrong!');
    }
  }

  addAddress() {
    this.addressValue = this.addressForm.value;
    if (this.userId && this.addressForm.valid) {
      this.loginService.addAddress(this.userId, this.addressValue).subscribe((res) => {
      });
      this.router.navigate(['/login']);
    }

    else if (this.Id && this.addressForm.valid) {
      this.loginService.addAddress(this.Id, this.addressValue).subscribe((res) => {
      });
      this.addressForm.reset();
      // this.router.navigate(['/dashboard']);
    }

    else {
      alert('Something went wrong!');
    }
    this.open = ''
    this.getUserDetail();
  }

  showAddressForm(opened: any, address: any, index: number) {
    this.show = true;
    this.open = opened;
    this.addressForm.patchValue(address);
    this.addressIndex = index;
  }

  updateAddress() {
    this.addressValue = this.addressForm.value;
    this.loginService.updateAddress(this.Id, this.addressValue, this.addressIndex).subscribe(res => { });
    this.addressForm.reset();
    this.show = false;
    this.open = '';
  }

  deleteAddress(index: number, event: Event) {
    event.stopPropagation();
    this.loginService.deleteAddress(this.Id, index).subscribe(res => {
    })
  }

  addMember() {
    this.familyMemberValue = this.familyMemberForm.value;
    if (this.userId && this.familyMemberForm.valid) {
      this.loginService.addFamilyMember(this.userId, this.familyMemberValue).subscribe(res => { });
      // this.router.navigate(['/dashboard']);
      this.open = ''
      this.getUserDetail();
    }
    else if (this.Id && this.familyMemberForm.valid) {
      this.loginService.addFamilyMember(this.Id, this.familyMemberValue).subscribe(res => { });
      this.familyMemberForm.reset();
      // this.router.navigate(['/dashboard']);
      this.open = ''
      this.getUserDetail();
    } else {
      alert('Something went wrong!');
    }
  }

  showFamilyMemberForm(opened: any, member: any, index: number) {
    this.show = true;
    this.open = opened;
    member.memberDOB = new Date(member.memberDOB)
    this.familyMemberForm.patchValue(member)
    this.familyMemberIndex = index;
  }

  updateMember() {
    this.familyMemberValue = this.familyMemberForm.value;
    this.loginService.updateFamilyMember(this.Id, this.familyMemberValue, this.familyMemberIndex).subscribe(res => { });
    this.familyMemberForm.reset();
    this.getUserDetail();
    this.show = false;
    this.open = ''
  }

  deleteFamilyMember(index: number, event: Event) {
    event.stopPropagation();
    this.loginService.deleteFamilyMember(this.Id, index).subscribe(res => { })
    this.getUserDetail();
  }

  getUserDetail() {
    if (this.Id) {
      this.loginService.getUserDetail(this.Id).subscribe((res: any) => {
        this.userDetail = res;
        this.userDetail.DOB = new Date(this.userDetail.DOB)
        this.profileForm.patchValue(this.userDetail);
        this.familyMember = this.userDetail.familyMember;
        this.address = this.userDetail.address;
      });
    }
  }


}
