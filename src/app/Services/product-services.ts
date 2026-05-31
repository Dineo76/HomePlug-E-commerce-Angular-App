import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);

  products = signal<any[]>([]);

  apiUrl = 'https://dummyjson.com/products?limit=200';

  getProducts() {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {

        const homewareProducts = response.products.filter(
          (product: any) =>
            product.category === 'furniture' ||
            product.category === 'home-decoration' ||
            product.category === 'kitchen-accessories'
        );

        this.products.set(homewareProducts);
      },

      error: (err: any) => {
        console.warn('API failed, retrying later...', err);
      }
    });
  }
}