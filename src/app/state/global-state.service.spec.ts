import { TestBed } from '@angular/core/testing';

import { GlobalStateService } from './global-state.service';
import { ItemInCart } from '../types/types';

describe('GlobalStateService', () => {
  let service: GlobalStateService;
  const item: ItemInCart = {
    picture: '',
    name: '',
    id: '12',
    price: 0,
    description: '',
    count: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to the cart', (done: DoneFn) => {
    const expectedItems: ItemInCart[] = [item];

    service.addItem(item);
    service.cart$.subscribe({
      next: (list: ItemInCart[]) => {
        expect(list).toEqual(expectedItems);
        done();
      },
    });
  });

  it('should remove items from the cart', (done: DoneFn) => {
    service.addItem(item);
    service.addItem(item);
    service.removeItem(item.id);
    service.cart$.subscribe({
      next: (list: ItemInCart[]) => {
        expect(list).toEqual([]);
        done();
      },
    });
  });

  it('should remove one item from the cart', (done: DoneFn) => {
    service.addItem(item);
    service.addItem(item);
    service.removeOneItem(item.id);
    service.cart$.subscribe({
      next: (list: ItemInCart[]) => {
        expect(list).toEqual([item]);
        done();
      },
    });
  });

  it('should set searchValue', (done: DoneFn) => {
    const value = '12122211';
    service.setSearchValue(value);
    service.search$.subscribe({
      next: (searchVal: string) => {
        expect(searchVal).toEqual(value);
        done();
      },
    });
  });
});
