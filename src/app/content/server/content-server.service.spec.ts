import { TestBed } from '@angular/core/testing';

import { ContentServerService } from './content-server.service';

describe('ContentServerService', () => {
  let service: ContentServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
