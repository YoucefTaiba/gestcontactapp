import { TestBed } from '@angular/core/testing';

import { GestContactInterceptor } from './gest-contact.interceptor';

describe('GestContactInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GestContactInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GestContactInterceptor = TestBed.inject(GestContactInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
