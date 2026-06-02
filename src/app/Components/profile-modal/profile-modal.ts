import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthStateService } from '../../services/auth-state';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [CommonModule, RouterLink],
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

  constructor(
    private authService: AuthStateService,
    private router: Router
  ) {}

  close() {
    this.closeModal.emit();
  }

  onLogout() {
    this.logoutEvent.emit();
    this.close();
  }
}