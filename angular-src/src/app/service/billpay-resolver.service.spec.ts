import { TestBed } from '@angular/core/testing';

import { BillpayResolverService } from './billpay-resolver.service';

describe('BillpayResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillpayResolverService = TestBed.get(BillpayResolverService);
    expect(service).toBeTruthy();
  });
});
