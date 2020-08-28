import { TestBed } from '@angular/core/testing';

import { VehicleCalculatorService } from './vehicle-calculator.service';

describe('VehicleCalculatorService', () => {
  let service: VehicleCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
