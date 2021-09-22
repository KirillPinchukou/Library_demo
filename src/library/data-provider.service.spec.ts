import {TestBed} from '@angular/core/testing';

import {LocalStorageDataProvider} from './local-storage-data-provider.service';

describe('DataProviderService', () => {
  let service: LocalStorageDataProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageDataProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return books', () => {
    expect(service.getBooks('') !== null);
  });
});

