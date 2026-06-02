import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  saveCart(uid: string, cart: any[]) {
    localStorage.setItem(
      `cart_${uid}`,
      JSON.stringify(cart)
    );
  }

  loadCart(uid: string): any[] {
    const data = localStorage.getItem(`cart_${uid}`);

    return data ? JSON.parse(data) : [];
  }

  saveWishlist(uid: string, wishlist: any[]) {
    localStorage.setItem(
      `wishlist_${uid}`,
      JSON.stringify(wishlist)
    );
  }

  loadWishlist(uid: string): any[] {
    const data = localStorage.getItem(`wishlist_${uid}`);

    return data ? JSON.parse(data) : [];
  }
}