import { TestBed } from '@angular/core/testing';

import { ContentService } from './content-service.service';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../types/types';
import { of } from 'rxjs';

describe('ContentService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  });

  it('should be created', () => {
    TestBed.configureTestingModule({
      providers: [
        ContentService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    const service = TestBed.inject(ContentService);
    expect(service).toBeTruthy();
  });

  it('should exist', () => {
    const service: ContentService = new ContentService(httpClientSpy);
    expect(service).toBeTruthy();
  });

  it('should return a list of items asynchronously', (done: DoneFn) => {
    const expectedItems: Item[] = [
      { picture: '', name: '', id: '', price: 0, description: '' },
    ];

    httpClientSpy.get.and.returnValue(of(expectedItems));
    const service: ContentService = new ContentService(httpClientSpy);
    service.getTshirts().subscribe({
      next: (list: Item[]) => {
        expect(list).toBe(expectedItems);
        done();
      },
    });
  });
});
