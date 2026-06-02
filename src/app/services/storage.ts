import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private hasStorage(): boolean {
    return typeof localStorage !== 'undefined';
  }

  saveCart(uid: string, cart: any[]) {
    if (!this.hasStorage()) {
      return;
    }

    localStorage.setItem(
      `cart_${uid}`,
      JSON.stringify(cart)
    );
  }

  loadCart(uid: string): any[] {
    if (!this.hasStorage()) {
      return [];
    }

    const data = localStorage.getItem(`cart_${uid}`);

    return data ? JSON.parse(data) : [];
  }

  saveWishlist(uid: string, wishlist: any[]) {
    if (!this.hasStorage()) {
      return;
    }

    localStorage.setItem(
      `wishlist_${uid}`,
      JSON.stringify(wishlist)
    );
  }

  loadWishlist(uid: string): any[] {
    if (!this.hasStorage()) {
      return [];
    }

    const data = localStorage.getItem(`wishlist_${uid}`);

    return data ? JSON.parse(data) : [];
  }
}