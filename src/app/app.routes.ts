import { Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register';

import { LoginComponent } from './Components/login/login';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password';


export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }
];
