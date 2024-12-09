import { Injectable } from '@angular/core';
import {
  featuredCollections,
  homeAndSpacesCollections,
  megaProjectsCollections,
} from '@siddhesh-savant-photography/mocking';
import {
  IPhotoCard,
  IPhotoCollection,
  IPhotoCollectionCard,
} from '@siddhesh-savant-photography/models';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public getHomeAndSpacesCollections(
    collectionId: string
  ): IPhotoCollection | undefined {
    return homeAndSpacesCollections().find(
      (collection) => collection.collectionId === collectionId
    );
  }

  public getHomeAndSpacesCollectionsCardColumns(
    totalChunks: number
  ): IPhotoCollectionCard[][] {
    const photoCollectionCardColumns = this.chunkifyPhotoCollectionCards(
      this.getHomeAndSpacesCollectionCards(),
      totalChunks
    ) as IPhotoCollectionCard[][];
    this.prioritizePhotoCollectionCards(photoCollectionCardColumns);
    return photoCollectionCardColumns;
  }

  public getMegaProjectsCollections(
    collectionId: string
  ): IPhotoCollection | undefined {
    return megaProjectsCollections().find(
      (collection) => collection.collectionId === collectionId
    );
  }

  public getMegaProjectsCollectionsCardColumns(
    totalChunks: number
  ): IPhotoCollectionCard[][] {
    const photoCollectionCardColumns = this.chunkifyPhotoCollectionCards(
      this.getMegaProjectsCollectionCards(),
      totalChunks
    ) as IPhotoCollectionCard[][];
    this.prioritizePhotoCollectionCards(photoCollectionCardColumns);
    return photoCollectionCardColumns;
  }

  public getFeaturedCollections(
    collectionId: string
  ): IPhotoCollection | undefined {
    return featuredCollections().find(
      (collection) => collection.collectionId === collectionId
    );
  }

  public getFeaturedCollectionsCardColumns(
    totalChunks: number
  ): IPhotoCollectionCard[][] {
    const photoCollectionCardColumns = this.chunkifyPhotoCollectionCards(
      this.getFeaturedCollectionCards(),
      totalChunks
    ) as IPhotoCollectionCard[][];
    this.prioritizePhotoCollectionCards(photoCollectionCardColumns);
    return photoCollectionCardColumns;
  }

  private getHomeAndSpacesCollectionCards() {
    return homeAndSpacesCollections().map((collection) => {
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

  private getMegaProjectsCollectionCards() {
    return megaProjectsCollections().map((collection) => {
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

  private getFeaturedCollectionCards() {
    return featuredCollections().map((collection) => {
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

  private chunkifyPhotoCards(
    photoCards: IPhotoCard[],
    totalChunks: number
  ): IPhotoCard[][] {
    const chunks = Array(totalChunks);
    const chunkSizes = Array(totalChunks).fill(0);
    for (const item of photoCards) {
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

  private prioritizePhotoCards(photoCardColumns: IPhotoCard[][]): void {
    for (const photoCardColumn of photoCardColumns) {
      if (photoCardColumn) {
        if (photoCardColumn.length === 0) {
          continue;
        } else if (photoCardColumn.length === 1) {
          photoCardColumn[0].eager = true;
        } else if (photoCardColumn.length === 2) {
          photoCardColumn[0].eager = true;
          photoCardColumn[1].eager = true;
        } else {
          photoCardColumn[0].eager = true;
          photoCardColumn[1].eager = true;
          photoCardColumn[2].eager = true;
        }
      }
    }
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
