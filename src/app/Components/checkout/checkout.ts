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
    const success = await this.paymentService.processPayment(
      this.paymentDetails,
      this.totalAmount()
    );
    
    if (success) {
      setTimeout(() => {
        this.handleSuccess();
      }, 2000);
    }
  }
  
  handleSuccess() {
    this.onPaymentSuccess.emit();
    this.paymentService.resetPaymentState();
    this.onClose.emit();
  }
}