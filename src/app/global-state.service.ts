import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from './content/types';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  constructor() {}
  private cartItems = new BehaviorSubject<Item[]>([]);
  private searchValue = new BehaviorSubject<string>('');
  cart$ = this.cartItems.asObservable();
  search$ = this.searchValue.asObservable();

  addItem(newItem: Item) {
    const newCart = [...this.cartItems.value, newItem];
    this.cartItems.next(newCart);
  }

  removeItem(id: string) {
    const newCart = this.cartItems.value.filter((item) => item.id !== id);
    this.cartItems.next(newCart);
  }

  setSearchValue(str: string) {
    this.searchValue.next(str);
  }
}
