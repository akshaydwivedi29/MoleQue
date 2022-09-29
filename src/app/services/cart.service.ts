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
    this.loadCart();
  }

  addToCart(item: any) {
    return this.http.post(`${environment.serverURL}cart/`, item);
  }

  addToCartLS(item: any) {
    this.items.push(item);
    this.saveCartLS();
  }

  getItems(userId: string) {
    return this.http.get(
      `${environment.serverURL}cart/getCartByUserId/${userId}`
    );
  }

  getItemsLS() {
    return this.items;
  }

  clearCart(userId: string) {
    return this.http.delete(`${environment.serverURL}cart/removeAll/${userId}`);
  }

  clearCartLS() {
    this.items = [];
    localStorage.removeItem('cart_items');
  }

  removeItem(testId: any) {
    return this.http.delete(`${environment.serverURL}cart/${testId}`);
  }

  removeItemLS(item: any) {
    const index = this.items.findIndex((o: any) => o._id === item._id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCartLS();
    }
  }

  getAllTestDetail() {
    return this.http.get<TestList[]>(`${environment.serverURL}search`);
  }

  saveCartLS() {
    localStorage.setItem('cart_items', JSON.stringify(this.items));
    this.publishCartCount();
  }

  loadCart() {
    let cartItems = localStorage.getItem('cart_items');
    if (cartItems) {
      this.items = JSON.parse(cartItems);
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
}
