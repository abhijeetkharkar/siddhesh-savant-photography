import { Injectable } from '@angular/core';
import { collections, photos } from '@siddhesh-savant-photography/mocking';
import {
  IPhotoCard,
  IPhotoCollectionCard,
} from '@siddhesh-savant-photography/models';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public getPhotoCardsV1() {
    return collections().map((collection, i) => {
      return {
        collectionId: collection.collectionId,
        thumbnailUrl: collection.thumbnailUrl,
        thumbnailAltText: collection.thumbnailAltText,
        title: collection.title,
        description: collection.description,
        eager: [0, 1, 2].includes(i),
      } as IPhotoCollectionCard;
    });
  }

  public getPhotoCardsV2() {
    return photos().map((photo, i) => {
      return {
        collectionId: `${i}`,
        photoId: photo.id,
        thumbnailUrl: photo.url,
        thumbnailAltText: photo.altText,
        eager: [0, 1, 2].includes(i),
        width: photo.width,
        height: photo.height,
      } as IPhotoCard;
    });
  }

  public getPhotoCardColumns(totalChunks: number): IPhotoCard[][] {
    const photoCards = photos().map((photo, i) => {
      return {
        collectionId: `${i}`,
        photoId: photo.id,
        thumbnailUrl: photo.url,
        thumbnailAltText: photo.altText,
        eager: [0, 1, 2].includes(i),
        width: photo.width,
        height: photo.height,
      } as IPhotoCard;
    });
    const photoCardColumns = this.chunkifyWithLru(
      photoCards,
      totalChunks
    ) as IPhotoCard[][];
    this.prioritizeImages(photoCardColumns);
    return photoCardColumns;
  }

  private chunkifyWithLru(
    data: IPhotoCard[],
    totalChunks: number
  ): IPhotoCard[][] {
    const chunks = Array(totalChunks);
    const chunkSizes = Array(totalChunks).fill(0);
    for (const item of data) {
      const scaledHeight = 400 * (item.height ?? 0) / (item.width ?? 1);
      const smallestHeightChunkIndex = chunkSizes.indexOf(
        Math.min(...chunkSizes)
      );
      if (!chunks[smallestHeightChunkIndex]) {
        chunks[smallestHeightChunkIndex] = [];
      }
      chunks[smallestHeightChunkIndex].push(item);
      chunkSizes[smallestHeightChunkIndex] += scaledHeight;
    }
    return chunks;
  }

  private prioritizeImages (photoCardColumns: IPhotoCard[][]): void {
    for(const photoCardColumn of photoCardColumns) {
      photoCardColumn[0].eager = true;
      photoCardColumn[1].eager = true;
      photoCardColumn[2].eager = true;
    }
  }
}
