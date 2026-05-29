import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SocialLink {
  label: string;
  symbol: string;
  href: string;
}

interface FooterLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  readonly brandName = signal<string>('ShopWave');
  readonly tagline = signal<string>('Quality finds, delivered to your door.');
  readonly email = signal<string>('hello@shopwave.com');
  readonly phone = signal<string>('+27 21 000 1234');
  readonly address = signal<string>('Cape Town, South Africa');
  readonly currentYear = signal<number>(new Date().getFullYear());

  readonly copyright = computed(
    () => `© ${this.currentYear()} ${this.brandName()}`
  );

  readonly footerSections = signal<{ title: string; links: FooterLink[] }[]>([
    {
      title: 'About',
      links: [
        { label: 'Our Story', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms & Conditions', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Cookie Policy', href: '#' },
      ],
    },
  ]);

  readonly socials = signal<SocialLink[]>([
    { label: 'Twitter', symbol: '𝕏', href: '#' },
    { label: 'Instagram', symbol: '◈', href: '#' },
    { label: 'Facebook', symbol: 'f', href: '#' },
  ]);
}