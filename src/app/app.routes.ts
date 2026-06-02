import { Routes } from '@angular/router';
import { HomePage } from './Components/home-page/home-page';
// import { ProductDetails } from './Components/product-details/product-details';
import { Products } from '../app/Components/products/products';
import { FAQs } from './Components/faqs/faqs';



export const routes: Routes = [
  { path: '', component: HomePage },
  {path: 'home', component: HomePage },
  { path: 'product/:id', component: ProductDetails },
  { path: 'faqs', component: FAQs },
  // { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: Products },
  { path: '**', redirectTo: 'home' }
];
