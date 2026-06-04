import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  async register(email: string, password: string, firstName?: string, lastName?: string) {
    const api = environment.authApi;
    console.log(`AuthService: registering user via ${api}/users with email:`, email);
    
    try {
      console.log('AuthService: checking if email already exists...');
      const existingUsers = await firstValueFrom(
        this.http.get<any[]>(`${api}/users?email=${email}`)
      );
      console.log('AuthService: existing users check response:', existingUsers);

      if (existingUsers && existingUsers.length > 0) {
        console.log('AuthService: email already exists error');
        throw new Error('Email already exists');
      }

      const newUser = {
        email,
        password,
        firstName: firstName || '',
        lastName: lastName || '',
        id: Date.now().toString()
      };

      console.log('AuthService: posting new user data:', newUser);
      const createdUser = await firstValueFrom(
        this.http.post<any>(`${api}/users`, newUser)
      );
      console.log('AuthService: user created successfully:', createdUser);

      return {
        user: {
          uid: createdUser.id,
          email: createdUser.email,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName
        }
      };
    } catch (err) {
      console.error('AuthService: registration error details:', err);
      throw err;
    }
  }

  async login(email: string, password: string) {
    const api = environment.authApi;
    console.log(`AuthService: logging in user via ${api}/users for email:`, email);
    
    try {
      console.log('AuthService: querying user details...');
      const users = await firstValueFrom(
        this.http.get<any[]>(`${api}/users?email=${email}`)
      );
      console.log('AuthService: query response users:', users);

      if (!users || users.length === 0) {
        console.log('AuthService: user not found in DB');
        throw new Error('User not found');
      }

      const user = users[0];
      if (user.password !== password) {
        console.log('AuthService: password mismatch');
        throw new Error('Invalid email or password');
      }

      console.log('AuthService: password validation successful');
      return {
        user: {
          uid: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      };
    } catch (err) {
      console.error('AuthService: login error details:', err);
      throw err;
    }
  }

  getUser() {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  forgotPassword(email: string) {
    return Promise.reject(new Error('Password reset is not supported under local JSON Server mode.'));
  }

  logout() {
    return Promise.resolve();
  }
}
