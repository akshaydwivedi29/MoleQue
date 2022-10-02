import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { TestsService, TestList } from '../services/tests.service';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  testlist: Array<TestList> = [];
  cartCount: any;
  hasQuery: boolean = false;
  showLogout: boolean = false;
  itemCount: number = 0;
  userId: string = '';
  mobileMenu: boolean = true;
  topHeader: boolean = true;

  constructor(
    private testsService: TestsService,
    private router: Router,
    private cartService: CartService
  ) {
    this.cartService.events.subscribe((res: any) => {
      this.itemCount = parseInt(res);
    });

    this.userId = localStorage.getItem('id') || '';
  }

  sendData(event: any) {
    let query = event.target.value;
    if (!query || query.length < 1) {
      return;
    }
    this.testsService.searchTestList(query).subscribe((res: any) => {
      this.testlist = res;
    });
  }

  ngOnInit(): void {
    this.getCart();
    if (this.userId) {
      this.showLogout = true;
    }
  }

  async getCart() {
    this.cartCount = this.cartService.getItemsLS();
    this.itemCount = this.cartCount.length;
  }

  close() {
    setTimeout(() => {
      this.hasQuery = false;
      this.testlist = [];
      $('#searchText').val('');
    }, 300);
  }

  routeData(searchText: any) {
    this.router.navigate(['/test-details', { Id: searchText._id }]);
  }

  showMenu() {
    this.mobileMenu = !this.mobileMenu;
  }

  showMobileSearch() {
    this.topHeader = false;
  }

  closeMobileSearch() {
    this.topHeader = true;
  }

  login() {
    localStorage.removeItem('id')
    this.router.navigate(['/login'])
  }
}
