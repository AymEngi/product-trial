import {Component, inject, OnInit, signal} from '@angular/core';
import {CartService, Product} from "../cart.service";
import {CurrencyPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  private readonly cartService = inject(CartService);

  ngOnInit() {
    this.cartService.get().subscribe();
  }

  removeFromCart(product: number) {
    this.cartService.removeFromCart(product).subscribe();
  }
}
