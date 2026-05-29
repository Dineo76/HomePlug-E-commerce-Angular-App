import { Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register';

import { LoginComponent } from './Components/login/login';


export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];
