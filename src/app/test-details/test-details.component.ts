import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from '../services/cart.service';
import { TestList, TestsService } from '../services/tests.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css'],
})
export class TestDetailsComponent implements OnInit {
  testId: string='';
  userId: string = '';
  obj!: TestList;
  toggleTab = false;
  canAddToCart = true;
  modal = false;

  @ViewChild('popup') popup!: ElementRef;
  @ViewChild('patient') patient!: ElementRef;
  @ViewChild('analytics') analytics!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private testsService: TestsService,
    private cartService: CartService,
    private renderer: Renderer2
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.testId = params.get('Id') || '';
      this.getData();
    });
    this.userId = localStorage.getItem('id') || '';

    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.popup.nativeElement &&
        e.target !== this.patient.nativeElement &&
        e.target !== this.analytics.nativeElement
      ) {
        this.modal = false;
      }
    });
  }

  ngOnInit(): void {}

  getData() {
    this.testsService.getTestDetail(this.testId).subscribe((results: any) => {
      this.obj = results;
      this.canAddToCart = !this.cartService.isAlreadyAddedInCart(this.obj);
    });
  }

  changeTab() {
    this.toggleTab = !this.toggleTab;
  }

  addToCart(item: any) {
    if (this.userId) {
      this.cartService
        .addToCart({ userId: this.userId, testDetail: item })
        .subscribe((res) => {
        });
      this.canAddToCart = !this.cartService.isAlreadyAddedInCart(item);
    } else {
      this.cartService.addToCartLS(item);
      this.canAddToCart = !this.cartService.isAlreadyAddedInCart(item);
    }

    this.modal = true;
  }
}
