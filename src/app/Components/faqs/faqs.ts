import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule],
  templateUrl: './faqs.html',
  styleUrls: ['./faqs.css'],
})
export class FAQs {
  faqs: { question: string; answer: string; open: boolean }[] = [

    {
      question: 'When can I expect my order to be delivered?',
      answer: 'Your order will be delivered within 3-5 business days after it is paid for.',
      open: false
    },

    {
      question: 'Do you offer nationwide delivery?',
      answer: 'Yes 😊, we offer nationwide delivery to all areas within the country.',
      open: false
    },

    {
      question: 'Can I track my order after purchase?',
      answer: 'Unfortunately No 😢 but we are currently working on implementing this feature.',
      open: false
    },

    {
      question: 'Is online payment secure?',
      answer: 'Yes, our online payment system is secure and encrypted.',
      open: false
    },

    {
      question: 'Are product colors exactly the same as shown online?',
      answer: 'Yes, we strive to ensure that the colors of our products are as accurate as possible when displayed online.',
      open: false
    },

    {
      question: 'Do bedroom sets come fully assembled?',
      answer: 'No, our bedroom sets require assembly. We provide detailed instructions and all necessary hardware for easy assembly.',
      open: false
    },

    {
      question: 'Are the kitchen accessories microwave or dishwasher safe?',
      answer: 'Yes, our kitchen accessories are designed to be safe for both microwave and dishwasher use.',
      open: false
    },
    {
      question: 'Can I return a product if I’m not satisfied?',
      answer: 'Yes, we offer a 30-day return policy for all our products.',
      open: false
    },
    {
      question: 'How do refunds work?',
      answer: 'Refunds are processed within 5-7 business days after we receive the returned item.',
      open: false
    },
    {
      question: 'What should I do if I receive a damaged item?',
      answer: 'Please contact our customer service team within 24 hours of receiving your order, and we will arrange for a replacement or refund.',
      open: false
    },
    {
      question: 'How do I know if an item is in stock?',
      answer: 'We display the current stock status for each item on its product page. If an item is out of stock, it will be marked as such.',
      open: false
    }
  ];
  searchText = '';
  visibleFaqs: { question: string; answer: string; open: boolean }[] = [];

  constructor() {
    this.visibleFaqs = this.faqs;
  }

  searchProduct() {
    const q = this.searchText?.trim().toLowerCase();
    if (!q) {
      this.visibleFaqs = this.faqs;
      return;
    }
    this.visibleFaqs = this.faqs.filter((f) =>
      f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }

  toggleFAQ(index: number) {
    const item = this.visibleFaqs[index];
    if (item) {
      item.open = !item.open;
    }
  }
}
