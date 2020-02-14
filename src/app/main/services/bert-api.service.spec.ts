import { TestBed } from '@angular/core/testing';

import { BertApiService } from './bert-api.service';

describe('BertApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BertApiService = TestBed.get(BertApiService);
    expect(service).toBeTruthy();
  });
});
