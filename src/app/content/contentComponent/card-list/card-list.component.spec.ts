import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListComponent } from './card-list.component';
import { Item } from '../../../types/types';
import { of } from 'rxjs';
import { GlobalStateService } from '../../../state/global-state.service';
import { ContentService } from '../../content-service/content-service.service';
import { Component, Input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CardComponent } from '../card/card.component';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  template: '<p class="cardComponent">{{item.name}}</p>',
  standalone: true,
})
export class CardComponentMock {
  @Input() item!: Item;
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

const spyContentService = {
  getTshirts: () => of(getTshirtArr()),
};

const handleRender = async (searchValue: string = '') => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;
  const spyStateObject = {
    search$: of(searchValue),
  };
  await TestBed.configureTestingModule({
    imports: [CardListComponent],
    providers: [
      {
        provide: GlobalStateService,
        useValue: spyStateObject,
      },
      {
        provide: ContentService,
        useValue: spyContentService,
      },
      provideAnimations(),
    ],
  })
    .overrideComponent(CardListComponent, {
      remove: { imports: [CardComponent] },
      add: { imports: [CardComponentMock] },
    })
    .compileComponents();

  fixture = TestBed.createComponent(CardListComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  return {
    fixture,
    component,
  };
};

describe('CardListComponent', () => {
  it('should create', async () => {
    const { component } = await handleRender();
    expect(component).toBeTruthy();
  });

  it('should create with card components === tshirt.length', async () => {
    const { fixture } = await handleRender();
    const cards = fixture.debugElement.queryAll(By.css('.cardComponent'));
    expect(cards.length).toEqual(getTshirtArr().length);
  });

  it('should show only card from search', async () => {
    const { fixture } = await handleRender('Name1');
    const cards = fixture.debugElement.queryAll(By.css('.cardComponent'));
    expect(cards.length).toBe(1);
  });

  it('should show only card from search', async () => {
    const { fixture } = await handleRender('Name1');
    const cards = fixture.debugElement.queryAll(By.css('.cardComponent'));
    expect(cards.length).toBe(1);
  });

  it('should sort', async () => {
    const { fixture } = await handleRender();
    const cards = fixture.debugElement.queryAll(By.css('.cardComponent'));
    const tshirtArr = getTshirtArr();
    expect(cards[0].nativeElement.textContent).toEqual(tshirtArr[0].name);
    expect(cards[1].nativeElement.textContent).toEqual(tshirtArr[1].name);
    const select = fixture.nativeElement.querySelector('select');
    select.value = 'priceHigh';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const cardsNew = fixture.debugElement.queryAll(By.css('.cardComponent'));
    expect(cardsNew[0].nativeElement.textContent).toEqual(tshirtArr[1].name);
    expect(cardsNew[1].nativeElement.textContent).toEqual(tshirtArr[0].name);
  });

  it('should create with pagination', async () => {
    const { fixture } = await handleRender();
    expect(fixture.nativeElement.querySelector('mat-paginator')).not.toBeNull();
  });
});
