import { Routes } from '@angular/router';
import { HomePage } from './Components/home-page/home-page';
import { Products } from '../app/Components/products/products';
import { CheckoutComponent } from './Components/checkout/checkout';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'products', component: Products },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect unknown routes to home
];