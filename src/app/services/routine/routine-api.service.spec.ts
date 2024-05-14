import { TestBed } from '@angular/core/testing';

import { RoutineApiService } from './routine-api.service';

describe('RoutineApiService', () => {
  let service: RoutineApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
