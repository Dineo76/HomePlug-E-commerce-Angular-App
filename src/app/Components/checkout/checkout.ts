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
      // Show custom toast
      this.showCustomToast('Payment Successful!', 'Thank you for your purchase!', '#10b981');
      
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
        this.showCustomToast('Payment Failed!', errorMsg, '#ef4444');
      }
    }
  }
  
  handleSuccess() {
    this.paymentService.resetPaymentState();
    this.onClose.emit();
  }
  
  // Custom toast that definitely works
  showCustomToast(title: string, message: string, color: string) {
    // Create toast element
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = color;
    toast.style.color = 'white';
    toast.style.padding = '15px 20px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '999999';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    toast.style.minWidth = '250px';
    toast.style.fontFamily = 'Arial, sans-serif';
    toast.style.animation = 'fadeInUp 0.3s ease';
    toast.innerHTML = `
      <strong style="display: block; margin-bottom: 5px;">${title}</strong>
      <span style="font-size: 14px;">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds 
    setTimeout(() => {
      toast.style.animation = 'fadeOutDown 0.3s ease';
      setTimeout(() => {
        if (toast && toast.remove) {
          toast.remove();
        }
      }, 300);
    }, 3000);
  }
}