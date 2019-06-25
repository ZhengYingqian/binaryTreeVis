import { TestBed, inject } from '@angular/core/testing';

import { TianqiService } from './tianqi.service';

describe('TianqiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TianqiService]
    });
  });

  it('should be created', inject([TianqiService], (service: TianqiService) => {
    expect(service).toBeTruthy();
  }));
});
