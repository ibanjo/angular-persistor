import { TestBed } from '@angular/core/testing';

import { NgxPersistorService } from './ngx-persistor.service';

describe('NgxPersistorService', () => {
  let service: NgxPersistorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxPersistorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
