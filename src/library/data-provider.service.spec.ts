import {TestBed} from '@angular/core/testing';
import {Injectable} from "@angular/core";
import {DataProviderService} from './data-provider.service';

describe('DataProviderService', () => {
  let service: DataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return books', () => {
    expect(service.getBooks('') !== null);
  });
});
