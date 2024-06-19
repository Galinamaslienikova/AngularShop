import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TshirtPageComponent } from './tshirt-page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ContentService } from '../content-service/content-service.service';
import { Item } from '../../types/types';
import { By } from '@angular/platform-browser';

const spyActivatedRoute = {
  params: of({ id: '123' }),
};

const tshirt: Item = {
  picture: '',
  name: 'Name',
  id: '123',
  price: 100,
  description: 'description',
};

const handleRender = async (item: Item = tshirt) => {
  let component: TshirtPageComponent;
  let fixture: ComponentFixture<TshirtPageComponent>;

  const spyContentService = {
    getOneTshirt: () => of([item]),
  };
  await TestBed.configureTestingModule({
    imports: [TshirtPageComponent],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: spyActivatedRoute,
      },
      {
        provide: ContentService,
        useValue: spyContentService,
      },
    ],
  }).compileComponents();

  fixture = TestBed.createComponent(TshirtPageComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  return {
    component,
    fixture,
  };
};

describe('TshirtPageComponent', () => {
  it('should create', async () => {
    const { component } = await handleRender();
    expect(component).toBeTruthy();
  });

  it('should contain header without search input', async () => {
    const { fixture } = await handleRender();
    expect(fixture.debugElement.query(By.css('.searchInput'))).toBeNull();
  });

  it('should render spinner when tshirt data isLoading', async () => {
    const { fixture, component } = await handleRender();
    component.isLoading = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#spinner')).not.toBeNull();
  });

  it('should not render spinner when tshirt data !isLoading', async () => {
    const { fixture } = await handleRender();
    expect(fixture.nativeElement.querySelector('#content')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('#spinner')).toBeNull();
  });
});
