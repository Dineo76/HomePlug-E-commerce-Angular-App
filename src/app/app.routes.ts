import { Routes } from '@angular/router';
import { HomePage } from './Components/home-page/home-page';
import { Products } from '../app/Components/products/products';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password';
import { LoginComponent } from './Components/login/login';
import { RegisterComponent } from './Components/register/register';
import { CheckoutComponent } from './Components/checkout/checkout';
import { FAQs } from './Components/faqs/faqs';



export const routes: Routes = [
  { path: '', component: HomePage },
  {path: 'home', component: HomePage },
  { path: 'faqs', component: FAQs },
  // { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: Products },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'faqs', component: FAQs },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
