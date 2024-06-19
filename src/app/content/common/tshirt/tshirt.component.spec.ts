import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TshirtComponent } from './tshirt.component';
import { Item, ItemInCart } from '../../../types/types';
import { of } from 'rxjs';
import { GlobalStateService } from '../../../state/global-state.service';

const tshirt: Item = {
  picture: '',
  name: 'Name',
  id: 'lklklk',
  price: 100,
  description: 'description',
};

const itemInCart: ItemInCart = { ...tshirt, count: 2 };

const addItemSpy = jasmine.createSpy('addItemSpy');
const removeOneItemSpy = jasmine.createSpy('removeOneItemSpy');
const spyStateObject = {
  search$: of(''),
  cart$: of([itemInCart]),
  addItem: addItemSpy,
  removeOneItem: removeOneItemSpy,
};

const handleRender = async (tshirtProp: Item = tshirt) => {
  let component: TshirtComponent;
  let fixture: ComponentFixture<TshirtComponent>;
  await TestBed.configureTestingModule({
    imports: [TshirtComponent],
    providers: [
      {
        provide: GlobalStateService,
        useValue: spyStateObject,
      },
    ],
  }).compileComponents();

  fixture = TestBed.createComponent(TshirtComponent);
  component = fixture.componentInstance;
  component.tshirt = tshirtProp;
  fixture.detectChanges();
  return {
    fixture,
    component,
  };
};

describe('TshirtComponent', () => {
  it('should create', async () => {
    const { component } = await handleRender();
    expect(component).toBeTruthy();
  });

  it('should contain', async () => {
    const { fixture } = await handleRender();
    const title = fixture.nativeElement.querySelector('mat-card-title');
    expect(title.textContent).toContain(tshirt.name);

    const price = fixture.nativeElement.querySelector('mat-card-subtitle');
    expect(price.textContent).toContain(`${tshirt.price} zl`);

    const content = fixture.nativeElement.querySelector('mat-card-content');
    expect(content.textContent).toContain(tshirt.description);

    const count = fixture.nativeElement.querySelector('span.count');
    expect(count.textContent).toContain(itemInCart.count);
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
      expect(removeOneItemSpy).toHaveBeenCalledWith(tshirt.id);
    });

    it('should renred with disabled remove button, when count is 0', async () => {
      const newTshirtProp = { ...tshirt, id: '123' };
      const { fixture } = await handleRender(newTshirtProp);
      const removeBtn = fixture.nativeElement.querySelector('#removeBtn');
      expect(removeBtn.getAttribute('disabled')).toBeTruthy();
    });
  });
});
