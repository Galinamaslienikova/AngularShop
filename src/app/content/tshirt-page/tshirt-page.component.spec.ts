import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TshirtPageComponent } from './tshirt-page.component';

describe('TshirtPageComponent', () => {
  let component: TshirtPageComponent;
  let fixture: ComponentFixture<TshirtPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TshirtPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TshirtPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
