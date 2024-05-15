import { TestBed } from '@angular/core/testing';

import { ComponentToggleService } from './component-toggle.service';

describe('ComponentToggleService', () => {
  let service: ComponentToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
