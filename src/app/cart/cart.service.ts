import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    this.loadCart();
  }

  items: any = [];
  totalCartValue: number = 0;
  protected _eventSubject = new Subject();
  public events = this._eventSubject.asObservable();

  addToCart(item: any) {
    this.items.push(item);
    this.saveCart();
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem('cart_items');
  }

  removeItem(item: any) {
    const index = this.items.findIndex((o: any) => o._id === item._id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }

  saveCart() {
    localStorage.setItem('cart_items', JSON.stringify(this.items));
    this.publishCartCount();
  }

  loadCart() {
    let cartItems = localStorage.getItem('cart_items');
    if (cartItems) {
      this.items = JSON.parse(cartItems);
      console.log(this.items);
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
