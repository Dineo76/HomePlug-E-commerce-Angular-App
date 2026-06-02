import { Routes } from '@angular/router';
import { HomePage } from './Components/home-page/home-page';
import { ProductDetails } from './Components/product-details/product-details';
import { Products } from '../app/Components/products/products';
import { CheckoutComponent } from './Components/checkout/checkout';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'products', component: Products },
  { path: 'product/:id', component: ProductDetails },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect unknown routes to home
];