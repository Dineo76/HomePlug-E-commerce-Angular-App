import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../services/auth-state';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-modal.html',
  styleUrls: ['./profile-modal.css']
})
export class ProfileModal {
  @Input() isLoggedIn = false;
  @Input() userEmail = '';
  @Input() userId = '';
  @Input() userFirstName = '';
  @Input() userLastName = '';
  @Output() closeModal = new EventEmitter<void>();
  @Output() logoutEvent = new EventEmitter<void>();
  @Output() showLogin = new EventEmitter<void>();
  @Output() showRegister = new EventEmitter<void>();

  constructor(
    private authService: AuthStateService
  ) {}

  close() {
    this.closeModal.emit();
  }

  onLogout() {
    this.logoutEvent.emit();
    this.close();
  }

  openLogin() {
    this.showLogin.emit();
  }

  openRegister() {
    this.showRegister.emit();
  }
}