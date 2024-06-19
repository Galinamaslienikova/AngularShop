import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainpageComponent } from './mainpage.component';
import { RouterModule } from '@angular/router';
import { CardListComponent } from '../content/contentComponent/card-list/card-list.component';

describe('MainpageComponent', () => {
  let component: MainpageComponent;
  let fixture: ComponentFixture<MainpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainpageComponent,
        RouterModule.forRoot([
          { path: 'tshirts', component: CardListComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display text', () => {
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.textContent).toContain('Start shopping');
    expect(btn.getAttribute('ng-reflect-router-link')).toBe('tshirts');
  });
});
