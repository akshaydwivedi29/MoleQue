import { Component, OnInit } from '@angular/core';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { TestsService } from '../header/tests.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-book-test',
  templateUrl: './book-test.component.html',
  styleUrls: ['./book-test.component.css'],
})
export class BookTestComponent implements OnInit {
  // closeResult = '';
  userId: any;
  testList: any;
  canAddToCart: boolean[] = [false];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 1500,
    autoplayTimeout: 7000,
    autoplayHoverPause: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 7,
    nav: true,
    // margin: 1,
  };

  constructor(
    private testService: TestsService,
    private router: Router,
    private cartService: CartService // private modalService: NgbModal
  ) {
    this.userId = localStorage.getItem('id');
    this.getTestList();
  }

  ngOnInit(): void {}

  // open(content: any) {
  //   this.modalService
  //     .open(content, { ariaLabelledBy: 'modal-basic-title' })
  //     .result.then(
  //       (result) => {
  //         this.closeResult = `Closed with: ${result}`;
  //       },
  //       (reason) => {
  //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //       }
  //     );
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  openRequestPage(test: any) {
    this.testService.getTestDetail(test._id).subscribe();
    this.router.navigate(['/test-details', { Id: test._id }]);
  }

  addToCart(item: any) {
    if (this.userId) {
      this.cartService
        .addToCart({ userId: this.userId, testDetail: item })
        .subscribe();
      this.canAddToCart[item._id] = !this.cartService.isAlreadyAddedInCart(
        item._id
      );
    } else {
      this.cartService.addToCartLS(item);
      this.canAddToCart[item._id] = !this.cartService.isAlreadyAddedInCart(
        item._id
      );
    }
  }

  getTestList() {
    this.cartService.getAllTestDetail().subscribe((res) => {
      this.testList = res;
    });
  }
}
