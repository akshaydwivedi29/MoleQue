import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address, userProfile } from '../dashboard/dashboard.model';
import { CartService } from '../services/cart.service';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addressForm: FormGroup;
  address: Address[] = [];
  timeSlot: Date[] = [];
  userAddress: Address | undefined;
  selectedDateTime: Date | undefined;
  userId: string = '';
  displayStyle: string = 'none';
  orderId: string = '';
  blur_bg: boolean = false;

  constructor(private loginService: LoginServiceService, private fb: FormBuilder, private cartService: CartService, private router: Router) {

    this.addressForm = this.fb.group({
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],
      landmark: [''],
    });

    this.userId = localStorage.getItem('id') || '';
    this.orderId = localStorage.getItem('orderId') || '';
  }

  ngOnInit(): void {
    this.addressDetail();
  }

  addressDetail() {
    this.loginService.getUserDetail(this.userId).subscribe((res: userProfile) => {
      this.address = res.address;
    })
  }

  keyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  openAddAddressPopup() {
    this.displayStyle = 'flex';
    this.blurBody();
  }

  closeAddAddressPopup() {
    this.displayStyle = 'none';
    this.sharpBody();
  }

  blurBody() {
    this.blur_bg = true;
  }

  sharpBody() {
    this.blur_bg = false;
  }

  addAddress() {
    if (this.userId && this.addressForm.valid) {
      this.loginService.addAddress(this.userId, this.addressForm.value).subscribe(() => {
        this.addressForm.reset();
        this.addressDetail();
        this.closeAddAddressPopup();
      });
    }
  }

  selectAddress(address: Address) {
    this.userAddress = address;
  }

  selectTime(time: Date) {
    this.selectedDateTime = time;
    console.log('selectTime',this.selectedDateTime)
  }

  generateTimeSlot(event: Event) {
    this.timeSlot = [];
    const date = (event.target as HTMLInputElement).value;
    const startDate = new Date(date);
    startDate.setHours(6);
    startDate.setMinutes(30);
    const endDate = new Date(date);
    endDate.setHours(19)
    endDate.setMinutes(0);
    while (startDate < endDate) {
      const a = new Date(startDate.setMinutes(startDate.getMinutes() + 30));
      this.timeSlot.push(a);
    }
  }

  confirm() {
    this.cartService.updateOrder(this.orderId, { userAddress: this.userAddress, scheduleSlot: this.selectedDateTime },).subscribe(() => {
      this.router.navigate(['/cart/order-summary'])
    })
  }

}
