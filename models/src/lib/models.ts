import { CarouselControlPosition, CarouselType, PaginationType } from './enums';

export interface IPhotoCard {
  photoId: string;
  thumbnailUrl: string;
  thumbnailAltText: string;
  title?: string;
  description?: string;
  eager?: boolean;
  width?: number;
  height?: number;
}

export interface IPhotoCollectionCard extends Omit<IPhotoCard, 'photoId'> {
  collectionId: string;
}

export interface IPhotoCollection extends IPhotoCollectionCard {
  photos: IPhoto[];
  previous?: Pick<IPhotoCollectionCard, 'collectionId' | 'title'>;
  next?: Pick<IPhotoCollectionCard, 'collectionId' | 'title'>;
}

export interface IPhotoCarousel {
  currentPhotoId?: string;
  photos?: IPhoto[];
  type: CarouselType;
  timerInterval?: number;
  paginationType: PaginationType;
  previousButton: ICarouselControl;
  nextButton: ICarouselControl;
  carouselControlsPosition: CarouselControlPosition;
  title?: string;
  previousCollection?: Pick<IPhotoCollectionCard, 'collectionId' | 'title'>;
  nextCollection?: Pick<IPhotoCollectionCard, 'collectionId' | 'title'>;
}

export interface IPhoto {
  id: string;
  title: string;
  description: string;
  url: string;
  altText: string;
  width?: number;
  height?: number;
}

export interface ICarouselControl {
  text?: string;
  icon?: string;
}
