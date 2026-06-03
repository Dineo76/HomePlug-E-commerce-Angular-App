import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService, PaymentDetails } from '../../Services/payment.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class CheckoutComponent {
  paymentService = inject(PaymentService);
  isOpen = input(false);
  totalAmount = input(0);
  onClose = output();
  onPaymentSuccess = output();
  
  paymentDetails: PaymentDetails = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  };
  
  formatCardNumber(value: string) {
    let cleanValue = value.replace(/\s/g, '');
    if (cleanValue.length > 16) cleanValue = cleanValue.slice(0, 16);
    this.paymentDetails.cardNumber = cleanValue.replace(/(\d{4})/g, '$1 ').trim();
  }
  
  formatExpiry(value: string) {
    let cleanValue = value.replace(/\//g, '');
    if (cleanValue.length > 4) cleanValue = cleanValue.slice(0, 4);
    if (cleanValue.length >= 2) {
      cleanValue = cleanValue.slice(0, 2) + '/' + cleanValue.slice(2);
    }
    this.paymentDetails.expiryDate = cleanValue;
  }
  
  async processPayment() {
    // Reset any previous errors
    this.paymentService.paymentError.set(null);
    
    const success = await this.paymentService.processPayment(
      this.paymentDetails,
      this.totalAmount()
    );
    
    if (success) {
      // Show success toast notification
      this.showSuccessMessage();
      
      // Emit success to parent to clear cart
      this.onPaymentSuccess.emit();
      
      // Auto close after 2 seconds
      setTimeout(() => {
        this.handleSuccess();
      }, 2000);
    } else {
      // If not successful, show error message
      const errorMsg = this.paymentService.paymentError();
      if (errorMsg) {
        this.showErrorMessage(errorMsg);
      }
    }
  }
  
  handleSuccess() {
    this.paymentService.resetPaymentState();
    this.onClose.emit();
  }
  
  // ADDED: Show success toast notification
  showSuccessMessage() {
    const toast = document.createElement('div');
    toast.className = 'checkout-toast success-toast';
    toast.innerHTML = `
      <div class="toast-icon">✓</div>
      <div class="toast-content">
        <strong>Payment Successful!</strong>
        <p>Thank you for your purchase. Your order has been confirmed.</p>
      </div>
    `;
    document.body.appendChild(toast);
    
    // Add remove animation and remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('remove');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  
  // ADDED: Show error toast notification
  showErrorMessage(message: string) {
    const toast = document.createElement('div');
    toast.className = 'checkout-toast error-toast';
    toast.innerHTML = `
      <div class="toast-icon">⚠️</div>
      <div class="toast-content">
        <strong>Payment Failed!</strong>
        <p>${message}</p>
      </div>
    `;
    document.body.appendChild(toast);
    
    // Add remove animation and remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('remove');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}