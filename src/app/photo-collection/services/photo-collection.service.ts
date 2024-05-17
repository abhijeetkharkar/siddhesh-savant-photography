import { Injectable } from '@angular/core';
import { featured } from '@siddhesh-savant-photography/mocking';
import { IPhotoCollection } from '@siddhesh-savant-photography/models';

@Injectable({
  providedIn: 'root',
})
export class PhotoCollectionService {
  constructor() {}

  public getPhotoCollectionItems(
    collectionId: string
  ): IPhotoCollection | undefined {
    const collectionList = featured();
    const currentIndex = collectionList.findIndex(
      (collection) => collection.collectionId === collectionId
    );
    let collection: IPhotoCollection = {
      ...collectionList[currentIndex],
    };
    if (currentIndex !== 0) {
      collection.previous = {
        collectionId: collectionList[currentIndex - 1].collectionId,
        title: collectionList[currentIndex - 1].title,
      };
    }
    if (currentIndex !== collectionList.length - 1) {
      collection.next = {
        collectionId: collectionList[currentIndex + 1].collectionId,
        title: collectionList[currentIndex + 1].title,
      };
    }

    return collection;
  }
}
