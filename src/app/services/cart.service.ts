import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TestList } from './tests.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: TestList[] = [];
  totalCartValue = 0;
  protected _eventSubject = new Subject();
  public events = this._eventSubject.asObservable();

  constructor(private http: HttpClient) {
    // server api call in future
    this.loadCart();
  }

  addToCart(item: any) {
    this.items.push(item);
    this.saveCart();
    // return this.http.post(`${environment.serverURL}cart/`, item);
  }

  /* getItems(userId: string) {
    return this.http.get(
      `${environment.serverURL}cart/getCartByUserId/${userId}`
    );
  } */

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem('cart_items');
    this.saveCart();
    // return this.http.delete(`${environment.serverURL}cart/removeAll/${userId}`);
  }

  removeItem(item: any) {
    const index = this.items.findIndex((o: any) => o._id === item._id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
    // return this.http.delete(`${environment.serverURL}cart/${testId}`);
  }

  getAllTestDetail() {
    return this.http.get<TestList[]>(`${environment.serverURL}search`);
  }

  saveCart() {
    localStorage.setItem('cart_items', JSON.stringify(this.items));
    this.publishCartCount();
    // synchronize user cart
    const userId = localStorage.getItem('id');
    if (userId) {
      this.http.post(`${environment.serverURL}cart/synchronizeCart/${userId}`, this.items).subscribe();
    }
  }

  loadCart() {
    // synchronize user cart
    const userId = localStorage.getItem('id');
    if (userId) {
      this.http.get(`${environment.serverURL}cart/synchronizeCart/${userId}`).subscribe((res: any) => {
        this.items = res.cart;
        localStorage.setItem('cart_items', JSON.stringify(this.items));
        this.publishCartCount();
      });
    }
    else {
      let cartItems = localStorage.getItem('cart_items');
      if (cartItems) {
        this.items = JSON.parse(cartItems);
      }
      else {
        this.items = [];
        this.totalCartValue = 0;
        this.publishCartCount();
      }
    }

  }

  getCartCount() {
    this.items.length;
  }

  publishCartCount() {
    this._eventSubject.next(this.items.length);
  }

  isAlreadyAddedInCart(item: any) {
    const index = this.items.findIndex((o: any) => o._id === item._id);
    if (index > -1) return true;
    return false;
  }

  getTotalCartValue() {
    this.totalCartValue = 0;
    this.items.forEach((element: any) => {
      this.totalCartValue += parseFloat(element.price);
    });
    return this.totalCartValue;
  }

  createOrder(userId: string, order: any) {
    return this.http.post(`${environment.serverURL}order/createOrder/${userId}`, order);
  }

  updateOrder(orderId: string, order: any) {
    return this.http.patch(`${environment.serverURL}order/${orderId}`, order);
  }

  getOrderByUserId(userId: string) {
    return this.http.get(`${environment.serverURL}order/orderByUserId/${userId}`)
  }

  deleteOrder(orderId:string){
    return this.http.delete(`${environment.serverURL}order/deleteOrderByOrderId/${orderId}`)
  }
}
