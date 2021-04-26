import { TestBed } from '@angular/core/testing';

import { AlarmServiceService } from './alarm-service.service';

describe('AlarmServiceService', () => {
  let service: AlarmServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
