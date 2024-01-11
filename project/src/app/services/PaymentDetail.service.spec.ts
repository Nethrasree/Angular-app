/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaymentDetailService } from './PaymentDetail.service';

describe('Service: PaymentDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentDetailService]
    });
  });

  it('should ...', inject([PaymentDetailService], (service: PaymentDetailService) => {
    expect(service).toBeTruthy();
  }));
});
