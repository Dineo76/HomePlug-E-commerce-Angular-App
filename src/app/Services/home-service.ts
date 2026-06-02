import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { productType, ServerProductType } from '../Interface/types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  productSig = signal<productType[]>([]);

  getProducts(): void {
    forkJoin({
      furniture:  this.http.get<ServerProductType>(`${environment.API}/category/furniture?limit=3`),
      kitchen:    this.http.get<ServerProductType>(`${environment.API}/category/kitchen-accessories?limit=3`),
      decoration: this.http.get<ServerProductType>(`${environment.API}/category/home-decoration?limit=3`),
    }).subscribe(({ furniture, kitchen, decoration }) => {
      this.productSig.set([
        ...furniture.products,
        ...kitchen.products,
        ...decoration.products,
      ]);
    });
  }
}