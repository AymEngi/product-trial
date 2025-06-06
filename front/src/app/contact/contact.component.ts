import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-contact',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './contact.component.html',
  standalone: true,
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  messageSent = false;
  email = '';
  message = '';

  onSubmit() {
    if (this.email && this.message.length <= 300) {
      this.messageSent = true;
    }
  }
}
