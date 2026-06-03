import { Routes } from '@angular/router';
import { HomePage } from './Components/home-page/home-page';
import { Products } from '../app/Components/products/products';
import { FAQs } from './Components/faqs/faqs';
import { CheckoutComponent } from './Components/checkout/checkout';



export const routes: Routes = [
  { path: '', component: HomePage },
  {path: 'home', component: HomePage },
  { path: 'faqs', component: FAQs },
  // { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: Products },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect unknown routes to home
  { path: '**', redirectTo: 'home' }
];
