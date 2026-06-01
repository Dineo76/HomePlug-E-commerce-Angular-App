import {
  Injectable,
  signal
} from '@angular/core';

import { AppState } from '../models/app-state';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  state = signal<AppState>({
    cart: [],
    wishlist: []
  });

  setState(state: AppState) {
    this.state.set(state);
  }

  clearState() {
    this.state.set({
      cart: [],
      wishlist: []
    });
  }

  updateCart(cart: any[]) {
    this.state.update(current => ({
      ...current,
      cart
    }));
  }

  updateWishlist(wishlist: any[]) {
    this.state.update(current => ({
      ...current,
      wishlist
    }));
  }
}