import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);

  products = signal<any[]>([]);

  apiUrl = 'https://dummyjson.com/products/category/furniture';

  getProducts() {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        this.products.set(response.products);
      },
      error: (err: any) => {
        console.warn('API failed, retrying later...', err);
      }
    });
  }
}