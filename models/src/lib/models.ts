import {
  CarouselControlPosition,
  CarouselType,
  PaginationType,
} from './enums';

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

export interface IPhotoCarousel {
  photos?: IPhoto[];
  type: CarouselType;
  timerInterval?: number;
  paginationType: PaginationType;
  previousButton: ICarouselControl;
  nextButton: ICarouselControl;
  carouselControlsPosition: CarouselControlPosition;
  title?: string;
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
