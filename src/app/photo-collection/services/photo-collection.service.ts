import { Injectable } from '@angular/core';
import { collections } from '@siddhesh-savant-photography/mocking';

@Injectable({
  providedIn: 'root',
})
export class PhotoCollectionService {
  constructor() {}

  public getPhotoCollection(collectionId: string) {
    return collections().find(
      (collection) => (collection.collectionId = collectionId)
    );
  }
}
