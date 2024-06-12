import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TshirtComponent } from './tshirt.component';

describe('TshirtComponent', () => {
  let component: TshirtComponent;
  let fixture: ComponentFixture<TshirtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TshirtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TshirtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
