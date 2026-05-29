import { Component, signal } from '@angular/core';
import { FAQs } from "./Components/faqs/faqs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FAQs],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('HomePlug-App');
}
