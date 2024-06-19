import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';
import { Component } from '@angular/core';
import { CardListComponent } from './card-list/card-list.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-header',
  template: '<p id="header"></p>',
  standalone: true,
})
export class HeaderComponentMock {}

@Component({
  selector: 'app-card-list',
  template: '<p id="cardListComponent"></p>',
  standalone: true,
})
export class CardListComponentMock {}

@Component({
  selector: 'app-footer',
  template: '<p id="footerComponent"></p>',
  standalone: true,
})
export class FooterComponentMock {}

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentComponent],
    })
      .overrideComponent(ContentComponent, {
        remove: {
          imports: [CardListComponent, HeaderComponent, FooterComponent],
        },
        add: {
          imports: [
            CardListComponentMock,
            HeaderComponentMock,
            FooterComponentMock,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create wwith components by default', () => {
    const document = fixture.nativeElement;
    expect(document.querySelector('#header')).not.toBeNull();
    expect(document.querySelector('#cardListComponent')).not.toBeNull();
    expect(document.querySelector('#footerComponent')).not.toBeNull();
  });
});
