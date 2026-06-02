import { Routes } from '@angular/router';
import { HomePage } from './Components/home-page/home-page';
import { ProductDetails } from './Components/product-details/product-details';
import { Products } from '../app/Components/products/products';


export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'product/:id', component: ProductDetails },
  { path: 'products', component: Products },
  { path: '**', redirectTo: '' }
];
