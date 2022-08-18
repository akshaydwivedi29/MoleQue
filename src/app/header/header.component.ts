import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestsService, TestList } from './tests.service';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private testsService: TestsService, private router: Router) { }

  testlist: Array<TestList> = [];
  hasQuery: Boolean = false;
  menuVariable: boolean = false;
  menu_icon_variable: boolean = false;

  sendData(event: any) {
    let query = event.target.value;
    if(!query || query.length<1){
      return ;
    }
    this.testsService.searchTestList(query).subscribe((res:any) => {
    this.testlist = res;
    })
  }

  openMenu(): void {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }

  ngOnInit(): void { }

  close() {
    setTimeout(() => {
      this.hasQuery = false;
      this.testlist = [];
      $('#searchText').val('');
    }, 200);
  }
  routeData(searchText: any) {
    console.log(searchText);
    this.router.navigate(['/test-details', { Id: searchText._id }]);
    // this.hasQuery = false;
    // this.testlist = [];
    // $('#searchText').val('');
  }
}
