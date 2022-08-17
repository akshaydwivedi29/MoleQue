import { TestBed } from '@angular/core/testing';

import { ForgotPswdService } from './forgot-pswd.service';

describe('ForgotPswdService', () => {
  let service: ForgotPswdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotPswdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
