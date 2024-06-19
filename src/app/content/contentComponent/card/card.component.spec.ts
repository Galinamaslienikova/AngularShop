import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { TshirtComponent } from '../../common/tshirt/tshirt.component';
import { RouterModule } from '@angular/router';
import { GlobalStateService } from '../../../state/global-state.service';
import { of } from 'rxjs';
import { Item, ItemInCart } from '../../../types/types';
import { By } from '@angular/platform-browser';

const tshirt: Item = {
  picture: '',
  name: 'Name',
  id: 'lklklk',
  price: 100,
  description: 'description',
};

const itemInCart: ItemInCart = { ...tshirt, count: 2 };

const addItemSpy = jasmine.createSpy('addItemSpy');
const removeItemSpy = jasmine.createSpy('removeOneItemSpy');
const spyStateObject = {
  cart$: of([itemInCart]),
  addItem: addItemSpy,
  removeItem: removeItemSpy,
};

const handleRender = async (tshirtProp: Item = tshirt) => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  await TestBed.configureTestingModule({
    imports: [
      CardComponent,
      RouterModule.forRoot([
        { path: "['/tshirts', item.id]", component: TshirtComponent },
      ]),
    ],
    providers: [
      {
        provide: GlobalStateService,
        useValue: spyStateObject,
      },
    ],
  }).compileComponents();

  fixture = TestBed.createComponent(CardComponent);
  component = fixture.componentInstance;
  component.item = tshirtProp;
  fixture.detectChanges();
  return {
    fixture,
    component,
  };
};

describe('CardComponent', () => {
  it('should create', async () => {
    const { component } = await handleRender();
    expect(component).toBeTruthy();
  });

  it('should render by default', async () => {
    const { fixture } = await handleRender();
    const document = fixture.nativeElement;
    expect(document.querySelector('a').textContent).toEqual(tshirt.name);
    expect(document.querySelector('img')).not.toBeNull();
    expect(
      fixture.debugElement.query(By.css('.price')).nativeElement.textContent
    ).toEqual(`Price: ${tshirt.price} zl`);
  });

  describe('buttons', () => {
    it('should call addItem', async () => {
      const { fixture } = await handleRender();
      const addBtn = fixture.nativeElement.querySelector('#addBtn');
      addBtn.click();
      fixture.detectChanges();
      expect(addItemSpy).toHaveBeenCalledWith(tshirt);
    });

    it('should call removeItem', async () => {
      const { fixture } = await handleRender();
      const removeBtn = fixture.nativeElement.querySelector('#removeBtn');
      expect(removeBtn.getAttribute('disabled')).toBeFalsy();
      removeBtn.click();
      fixture.detectChanges();
      expect(removeItemSpy).toHaveBeenCalledWith(tshirt.id);
    });

    it('should renred with disabled remove button, when count is 0', async () => {
      const newTshirtProp = { ...tshirt, id: '123' };
      const { fixture } = await handleRender(newTshirtProp);
      fixture.detectChanges();
      const removeBtn = fixture.nativeElement.querySelector('#removeBtn');
      expect(removeBtn.getAttribute('disabled')).toBeTruthy();
    });
  });
});
