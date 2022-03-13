import { TestBed } from '@angular/core/testing';

import { ContacteService } from './contacte.service';

describe('ContacteService', () => {
  let service: ContacteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContacteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
