import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { Component, Input } from '@angular/core';
import { TshirtComponent } from '../common/tshirt/tshirt.component';
import { HeaderComponent } from '../../header/header.component';
import { Item } from '../../types/types';
import { of } from 'rxjs';
import { GlobalStateService } from '../../state/global-state.service';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  template: '<p id="header"></p>',
  standalone: true,
})
export class HeaderComponentMock {
  @Input() isSearchShow: string = '';
}

const tshirt: Item = {
  picture: '',
  name: 'Name1',
  id: '1',
  price: 100,
  description: 'description',
};

const getTshirtArr = () => [
  tshirt,
  { ...tshirt, id: 2, name: 'Name2', price: 200 },
];

const spyStateObject = {
  cart$: of(getTshirtArr()),
};

@Component({
  selector: 'app-tshirt',
  template: '<p class="tshirtComponent"></p>',
  standalone: true,
})
export class TshirtComponentMock {
  @Input() tshirt!: Item;
}

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        {
          provide: GlobalStateService,
          useValue: spyStateObject,
        },
      ],
    })
      .overrideComponent(CartComponent, {
        remove: {
          imports: [TshirtComponent, HeaderComponent],
        },
        add: {
          imports: [HeaderComponentMock, TshirtComponentMock],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with tshirt components === tshirt.length', async () => {
    const cards = fixture.debugElement.queryAll(By.css('.tshirtComponent'));
    expect(cards.length).toEqual(getTshirtArr().length);
  });
});
