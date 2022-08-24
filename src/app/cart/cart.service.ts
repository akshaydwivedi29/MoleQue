import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  items: any = [];
  totalCartValue: number = 0;
  protected _eventSubject = new Subject();
  public events = this._eventSubject.asObservable();

  constructor(private http:HttpClient) { this.loadCart();
  }

  addToCart(item:any) {
    return this.http.post(`${environment.serverURL}cart/`,item);
  }
  
  getItems(userId:string) {
    return this.http.get(`${environment.serverURL}cart/getCartByUserId/${userId}`);
  }
  
  clearCart(userId:string) {
    return this.http.delete(`${environment.serverURL}cart/removeAll/${userId}`);
  }

  removeItem(testId: any) {
    return this.http.delete(`${environment.serverURL}cart/${testId}`);
  }

  getAllTestDetail() {
    return this.http.get(`${environment.serverURL}search`);
  }

  saveCart() {
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
}
