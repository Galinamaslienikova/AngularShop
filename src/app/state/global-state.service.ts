import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemInCart, Item } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  constructor() {}
  private cartItems = new BehaviorSubject<ItemInCart[]>([]);
  private searchValue = new BehaviorSubject<string>('');

  cart$ = this.cartItems.asObservable();
  search$ = this.searchValue.asObservable();

  addItem(newItem: Item) {
    const isItemExist: boolean = this.cartItems.value.some(
      (item) => item.id === newItem.id
    );
    let newCart: ItemInCart[] = this.cartItems.value;
    if (isItemExist) {
      newCart = this.cartItems.value.map((item) => {
        if (item.id === newItem.id) {
          return { ...item, count: item.count + 1 };
        } else {
          return item;
        }
      });
    } else {
      newCart.push({ ...newItem, count: 1 });
    }
    this.cartItems.next(newCart);
  }

  removeItem(id: string) {
    const newCart = this.cartItems.value.filter((item) => item.id !== id);
    this.cartItems.next(newCart);
  }

  removeOneItem(id: string) {
    const index = this.cartItems.value.findIndex((item) => item.id === id);
    const newCart = this.cartItems.value
      .map((item) => {
        if (item.id === id) {
          return { ...item, count: item.count - 1 };
        } else {
          return item;
        }
      })
      .filter((item) => item.count > 0);
    this.cartItems.next(newCart);
  }

  setSearchValue(str: string) {
    this.searchValue.next(str);
  }
}
