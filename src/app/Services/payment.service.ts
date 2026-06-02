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
    
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.validatePaymentDetails(paymentDetails)) {
          this.paymentSuccess.set(true);
          this.isProcessing.set(false);
          resolve(true);
        } else {
          this.paymentError.set('Invalid payment details. Please check and try again.');
          this.isProcessing.set(false);
          resolve(false);
        }
      }, 2000);
    });
  }

  private validatePaymentDetails(details: PaymentDetails): boolean {
    const cardNumberClean = details.cardNumber.replace(/\s/g, '');
    const isValidCardNumber = /^\d{16}$/.test(cardNumberClean);
    const isValidExpiry = /^(0[1-9]|1[0-2])\/(2[4-9]|[3-9][0-9])$/.test(details.expiryDate);
    const isValidCVV = /^\d{3,4}$/.test(details.cvv);
    const isValidName = details.cardholderName.trim().length > 0;
    
    return isValidCardNumber && isValidExpiry && isValidCVV && isValidName;
  }

  resetPaymentState() {
    this.isProcessing.set(false);
    this.paymentSuccess.set(false);
    this.paymentError.set(null);
  }
}