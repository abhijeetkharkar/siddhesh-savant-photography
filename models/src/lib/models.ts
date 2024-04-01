import { CarouselControlPosition, CarouselType, PaginationType } from './enums';

export interface IPhotoCard {
  collectionId: string;
  thumbnailUrl: string;
  thumbnailAltText: string;
  title?: string;
  description?: string;
}

export interface IPhotoCollection extends IPhotoCard {
  photos: IPhoto[];
}

export interface IPhotoCollectionItems extends IPhotoCollection {
  previous?: Pick<IPhotoCard, 'collectionId' | 'title'>;
  next?: Pick<IPhotoCard, 'collectionId' | 'title'>;
}

export interface IPhotoCarousel {
  photos?: IPhoto[];
  type: CarouselType;
  timerInterval?: number;
  paginationType: PaginationType;
  previousButton: ICarouselControl;
  nextButton: ICarouselControl;
  carouselControlsPosition: CarouselControlPosition;
  title?: string;
  previousCollection?: Pick<IPhotoCard, 'collectionId' | 'title'>;
  nextCollection?: Pick<IPhotoCard, 'collectionId' | 'title'>;
}

export interface IPhoto {
  title: string;
  description: string;
  url: string;
  altText: string;
}

export interface ICarouselControl {
  text?: string;
  icon?: string;
}
