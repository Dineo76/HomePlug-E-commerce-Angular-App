import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { productType, ServerProductType } from '../Interface/types';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  productSig = signal<productType[]>([]);

  
  getProducts(): Observable<ServerProductType> {
    return this.http.get<ServerProductType>(environment.API);
  }
  
  getProduct(id: number): Observable<productType> {
    return this.http.get<productType>(`${environment.API}/${id}`);
  }
}