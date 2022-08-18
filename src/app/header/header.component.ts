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
  cartCount: Array<TestList> = [];
  hasQuery: Boolean = false;
  menuVariable: boolean = false;
  menu_icon_variable: boolean = false;
  itemCount: number = 0;

  constructor(
    private testsService: TestsService,
    private router: Router,
    private cartService: CartService
  ) {
    this.cartService.events.subscribe((res: any) => {
      console.log(res);
      this.itemCount = parseInt(res);
    });
  }

  sendData(event: any) {
    let query: string = event.target.value;
    //Will match if query is nothing or is only spaces
    let matchSpaces: any = query.match(/\s*/);
    if (matchSpaces[0] === query) {
      this.testlist = [];
      this.hasQuery = false;
      return;
    }

    this.testsService
      .searchTestList(query.trim())
      .subscribe((results: TestList[]) => {
        this.testlist = results;
        this.hasQuery = true;
        // console.log(results);
      });
  }

  openMenu(): void {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }

  ngOnInit(): void {
    this.cartCount = this.cartService.getItems();
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
    this.router.navigate(['/test-details', { SearchText: searchText }]);
  }
}
