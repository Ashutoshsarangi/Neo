import { TestBed } from '@angular/core/testing';

import { WebServicesService } from './web-services.service';

describe('WebServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebServicesService = TestBed.get(WebServicesService);
    expect(service).toBeTruthy();
  });
});
