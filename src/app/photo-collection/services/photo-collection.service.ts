import { Injectable } from '@angular/core';
import { collections } from '@siddhesh-savant-photography/mocking';
import { IPhotoCollectionItems } from '@siddhesh-savant-photography/models';

@Injectable({
  providedIn: 'root',
})
export class PhotoCollectionService {
  constructor() {}

  public getPhotoCollectionItems(
    collectionId: string
  ): IPhotoCollectionItems | undefined {
    const collectionList = collections();
    const currentIndex = collectionList.findIndex(
      (collection) => collection.collectionId === collectionId
    );
    let collectionItems: IPhotoCollectionItems = {
      ...collectionList[currentIndex],
    };
    if (currentIndex !== 0) {
      collectionItems.previous = {
        collectionId: collectionList[currentIndex - 1].collectionId,
        title: collectionList[currentIndex - 1].title,
      };
    }
    if (currentIndex !== collectionList.length - 1) {
      collectionItems.next = {
        collectionId: collectionList[currentIndex + 1].collectionId,
        title: collectionList[currentIndex + 1].title,
      };
    }

    return collectionItems;
  }
}
