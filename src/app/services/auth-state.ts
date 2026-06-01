import {
  Injectable,
  signal,
  computed
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  user = signal<any | null>(null);

  isLoggedIn = computed(() =>
    this.user() !== null
  );

}