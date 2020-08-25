import { TestBed } from '@angular/core/testing';

import { ServerTypeService } from './server-type.service';

describe('ServerTypeService', () => {
  let service: ServerTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
