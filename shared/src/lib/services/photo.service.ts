import { Injectable } from '@angular/core';
import {
  IPhotoCollection,
  IPhotoCollectionCard,
} from '@siddhesh-savant-photography/models';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public getCollection(
    collectionId: string,
    collections: IPhotoCollection[]
  ): IPhotoCollection | undefined {
    return collections.find(
      (collection) => collection.collectionId === collectionId
    );
  }

  public getCollectionsCardColumns(
    totalChunks: number,
    collections: IPhotoCollection[]
  ): IPhotoCollectionCard[][] {
    const photoCollectionCardColumns = this.chunkifyPhotoCollectionCards(
      this.getCollectionCards(collections),
      totalChunks
    ) as IPhotoCollectionCard[][];
    this.prioritizePhotoCollectionCards(photoCollectionCardColumns);
    return photoCollectionCardColumns;
  }

  private getCollectionCards(collections: IPhotoCollection[]) {
    return collections.map((collection) => {
      return {
        collectionId: collection.collectionId,
        thumbnailUrl: collection.thumbnailUrl,
        thumbnailAltText: collection.thumbnailAltText,
        title: collection.title,
        description: collection.description,
        height: collection.height,
        width: collection.width,
      } as IPhotoCollectionCard;
    });
  }

  private chunkifyPhotoCollectionCards(
    photoCollectionCards: IPhotoCollectionCard[],
    totalChunks: number
  ): IPhotoCollectionCard[][] {
    const chunks = Array(totalChunks);
    const chunkSizes = Array(totalChunks).fill(0);
    for (const item of photoCollectionCards) {
      const scaledHeight = (400 * (item.height ?? 0)) / (item.width ?? 1);
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

  private prioritizePhotoCollectionCards(
    photoCollectionCardColumns: IPhotoCollectionCard[][]
  ): void {
    for (const photoCollectionCardColumn of photoCollectionCardColumns) {
      if (photoCollectionCardColumn) {
        if (photoCollectionCardColumn.length === 0) {
          continue;
        } else if (photoCollectionCardColumn.length === 1) {
          photoCollectionCardColumn[0].eager = true;
        } else if (photoCollectionCardColumn.length === 2) {
          photoCollectionCardColumn[0].eager = true;
          photoCollectionCardColumn[1].eager = true;
        } else {
          photoCollectionCardColumn[0].eager = true;
          photoCollectionCardColumn[1].eager = true;
          photoCollectionCardColumn[2].eager = true;
        }
      }
    }
  }
}
