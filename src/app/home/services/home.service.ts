import { Injectable } from '@angular/core';
import { collections } from '@siddhesh-savant-photography/mocking';
import { IPhotoCard } from '@siddhesh-savant-photography/models';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public getPhotoCards() {
    return collections().map((collection) => {
      return {
        collectionId: collection.collectionId,
        thumbnailUrl: collection.thumbnailUrl,
        thumbnailAltText: collection.thumbnailAltText,
        title: collection.title,
        description: collection.description,
      } as IPhotoCard;
    });
  }
}
