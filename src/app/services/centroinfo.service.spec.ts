import { TestBed } from '@angular/core/testing';

import { CentroinfoService } from './centroinfo.service';

describe('CentroinfoService', () => {
  let service: CentroinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentroinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
