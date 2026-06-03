import { Injectable, signal } from '@angular/core';

export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  isProcessing = signal(false);
  paymentSuccess = signal(false);
  paymentError = signal<string | null>(null);

  async processPayment(paymentDetails: PaymentDetails, amount: number): Promise<boolean> {
    this.isProcessing.set(true);
    this.paymentError.set(null);
    this.paymentSuccess.set(false);
    
    return new Promise((resolve) => {
      setTimeout(() => {
       
        if (!paymentDetails.cardholderName.trim()) {
          this.paymentError.set('Please enter cardholder name');
          this.isProcessing.set(false);
          resolve(false);
          return;
        }
        
        const cardNumberClean = paymentDetails.cardNumber.replace(/\s/g, '');
        if (cardNumberClean.length !== 16) {
          this.paymentError.set('Card number must be 16 digits');
          this.isProcessing.set(false);
          resolve(false);
          return;
        }
        
        if (!/^\d{16}$/.test(cardNumberClean)) {
          this.paymentError.set('Invalid card number');
          this.isProcessing.set(false);
          resolve(false);
          return;
        }
        
        if (!/^(0[1-9]|1[0-2])\/(2[4-9]|[3-9][0-9])$/.test(paymentDetails.expiryDate)) {
          this.paymentError.set('Invalid expiry date (MM/YY, must be future date)');
          this.isProcessing.set(false);
          resolve(false);
          return;
        }
        
        if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
          this.paymentError.set('CVV must be 3 or 4 digits');
          this.isProcessing.set(false);
          resolve(false);
          return;
        }
        
        // Success
        this.paymentSuccess.set(true);
        this.isProcessing.set(false);
        resolve(true);
      }, 2000);
    });
  }

  resetPaymentState() {
    this.isProcessing.set(false);
    this.paymentSuccess.set(false);
    this.paymentError.set(null);
  }
}