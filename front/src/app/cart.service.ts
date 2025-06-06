import {inject, Injectable, signal} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, tap} from 'rxjs';
import {HttpClient} from "@angular/common/http";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly path = '/api/cart';

  private readonly _cartItems = signal<Product[]>([]);
  public readonly cartItems = this._cartItems.asReadonly();

  public get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.path).pipe(
      catchError(() => of([])),
      tap((items) => this._cartItems.set(items))
    );
  }

  public addToCart(product: Product): Observable<boolean> {
    return this.http.post<boolean>(this.path, product).pipe(
      catchError(() => of(true)),
      tap(() => {
        this._cartItems.update(items => [...items, product]);
      })
    );
  }

  public removeFromCart(productId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.path}/${productId}`).pipe(
      catchError(() => of(true)),
      tap(() => {
        this._cartItems.update(items => items.filter(p => p.id !== productId));
      })
    );
  }

  public clear(): Observable<boolean> {
    return this.http.delete<boolean>(this.path).pipe(
      catchError(() => of(true)),
      tap(() => this._cartItems.set([]))
    );
  }

  public getTotalQuantity(): number {
    return this._cartItems().length;
  }
}
