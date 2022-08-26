import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { TestsService, TestList } from './tests.service';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {


  testlist: Array<TestList> = [];
  cartCount: any;
  hasQuery: Boolean = false;
  menuVariable: boolean = false;
  menu_icon_variable: boolean = false;
  itemCount: number = 0;
  userId: any;

  constructor(
    private testsService: TestsService,
    private router: Router,
    private cartService: CartService
  ) {
    this.cartService.events.subscribe((res: any) => {
      this.itemCount = parseInt(res);
    });

    this.userId = localStorage.getItem('id');
  }

  sendData(event: any) {
    let query = event.target.value;
    if (!query || query.length < 1) {
      return;
    }
    this.testsService.searchTestList(query).subscribe((res: any) => {
      this.testlist = res;
    })
  }

  openMenu(): void {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }

  ngOnInit(): void {
    this.getCart();
  }

  async getCart() {
    /* await this.cartService.getItems(this.userId).subscribe(res => {
      this.cartCount = res;
      this.itemCount = this.cartCount.length; */
      // });
      this.cartCount = this.cartService.getItemsLS();
      this.itemCount = this.cartCount.length;
      console.log(this.itemCount)

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
}
