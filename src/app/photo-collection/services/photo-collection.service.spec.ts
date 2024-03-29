import { TestBed } from '@angular/core/testing';

import { PhotoCollectionService } from './photo-collection.service';

describe('PhotoCollectionService', () => {
  let service: PhotoCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
