import { Component, OnInit } from '@angular/core';
import {CartService} from "../cart.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  cartQuantity = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.get().subscribe(items => {
      this.cartQuantity = items.length;
    });
  }
}
