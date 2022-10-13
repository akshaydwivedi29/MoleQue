import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Address, FamilyMember, userProfile } from '../dashboard/dashboard.model';
import { CartService } from '../services/cart.service';
import { LoginServiceService } from '../services/login-service.service';
import { TestList } from '../services/tests.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  testlist: TestList[] = [];
  familyMember: FamilyMember[] = [];
  userDetail!: userProfile;
  user: any;
  itemCount: number = 0;
  totalCartValue: number = 0;
  userId: string = '';
  displayStyle: string = 'none';
  displayStyleFamily: string = 'none';
  displayStyleAddress: string = 'none';
  displayStyleAddAddress: string = 'none';
  selectedMember: number = -1;
  selectedAddress: number = -1;
  blur_bg: boolean = false;
  selfSelected: boolean = false;
  cartCount: any;
  familyMemberForm: FormGroup;
  dateTime: any;
  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(private cartService: CartService, private router: Router, private loginService: LoginServiceService, private fb: FormBuilder) {
    // Datepicker starts
    this.datePickerConfig = Object.assign(
      {},
      { containerClass: 'theme-dark-blue' }
    );
    // Datepicker ends

    this.cartService.events.subscribe((res: any) => {
      this.itemCount = parseInt(res);
      this.loadData()
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

    this.userId = localStorage.getItem('id') || '';
  }

  ngOnInit(): void {
    this.loadData();
    this.familyDetails();
  }

  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  /* async getCart() {
    this.cartCount = this.cartService.getItems();
    this.itemCount = this.cartCount.length;
  } */


  loadData() {
    this.testlist = this.cartService.getItems();
    this.totalCartValue = this.cartService.getTotalCartValue();
  }

  removeItem(test: any) {
    this.cartService.removeItem(test);
    this.loadData();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadData();
  }

  openPrescription(event: Event) {
    this.router.navigate(['/book-test', { pre: event.type }])
  }

  openPopup() {
    this.displayStyle = 'flex';
    this.blurBody();
  }

  closePopup() {
    this.displayStyle = 'none';
    this.sharpBody();
    this.selfSelected = false;
    this.selectedMember = -1;
  }

  blurBody() {
    this.blur_bg = true;
  }

  sharpBody() {
    this.blur_bg = false;
  }

  familyDetails() {
    this.loginService.getUserDetail(this.userId).subscribe((res: any) => {
      this.userDetail = res;
      this.familyMember = this.userDetail.familyMember;
    })
  }

  openFamilyPopup() {
    this.closePopup();
    this.displayStyleFamily = 'flex';
    this.blurBody();
  }

  closeFamilyPopup() {
    this.displayStyleFamily = 'none';
    this.sharpBody();
    this.openPopup();
  }

  addMember() {
    if (this.userId && this.familyMemberForm.valid) {
      this.loginService.addFamilyMember(this.userId, this.familyMemberForm.value).subscribe(res => {
        this.familyDetails();
        this.closeFamilyPopup();
        this.openPopup();
      });
    }
  }

  selectFamilyMember(index: number, member: FamilyMember) {
    this.user = {
      firstName: member.memberFirstName,
      gender: member.memberGender,
      DOB: member.memberDOB,
      number: member.memberMobile
    };
    this.selectedMember = index;
    this.selfSelected = false;
  }

  selectSelf(user: userProfile) {
    this.user = {
      firstName: user.firstName,
      gender: user.gender,
      DOB: user.DOB, user,
      number: user.number
    };
    this.selfSelected = !this.selfSelected;
    this.selectedMember = -1;
  }

  proceed() {
    this.cartService.createOrder(this.userId, { userDetail: this.user, cart: this.testlist }).subscribe((res: any) => {
      const orderId = res._id;
      this.router.navigate(['/cart/address', { orderId: orderId }])
    })
  }


}
