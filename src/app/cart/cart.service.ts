import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    this.loadCart();
  }
  items: any = [];

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
  }

  loadCart() {
    let cartItems = localStorage.getItem('cart_items');
    if (cartItems) {
      this.items = JSON.parse(cartItems);
      console.log(this.items);
    }
  }
}
