import { Injectable } from '@angular/core';
import { AppState } from '../models/app-state';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private getKey(uid: string): string {
    return `app_state_${uid}`;
  }

  saveState(uid: string, state: AppState): void {
    localStorage.setItem(
      this.getKey(uid),
      JSON.stringify(state)
    );
  }

  loadState(uid: string): AppState {

    const savedState = localStorage.getItem(
      this.getKey(uid)
    );

    if (savedState) {
      return JSON.parse(savedState);
    }

    return {
      cart: [],
      wishlist: []
    };
  }

  removeState(uid: string): void {
    localStorage.removeItem(this.getKey(uid));
  }
}