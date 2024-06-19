import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { GlobalStateService } from '../state/global-state.service';
import { RouterLink, RouterModule } from '@angular/router';
import { CardListComponent } from '../content/contentComponent/card-list/card-list.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const setSearchValueSpy = jasmine.createSpy('setSearchValueSpy');
  const spyStateObject = {
    search$: of(''),
    cart$: of([]),
    setSearchValue: setSearchValueSpy,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterModule.forRoot([
          { path: 'tshirts', component: CardListComponent },
        ]),
      ],
      providers: [
        {
          provide: GlobalStateService,
          useValue: spyStateObject,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with h1', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('My Shop');
  });

  it('should has routerLink with proper href', () => {
    const linkDes = fixture.debugElement.query(By.directive(RouterLink));
    const routerLink = linkDes.injector.get(RouterLink);
    expect(routerLink.href).toBe('/tshirts');
  });

  it('should contain icon', () => {
    const icon = fixture.nativeElement.querySelector('mat-icon');
    expect(icon).toBeDefined();
  });

  describe('Search', () => {
    it('should has input with placeholder', () => {
      const input = fixture.nativeElement.querySelector('input');
      expect(input).toBeDefined();
      expect(input.getAttribute('placeholder')).toEqual('Search');
    });

    it('should call setSearchValueSpy when change input value', () => {
      const input = fixture.nativeElement.querySelector('input');
      input.value = 'New value';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(setSearchValueSpy).toHaveBeenCalledWith('New value');
    });
  });
});
