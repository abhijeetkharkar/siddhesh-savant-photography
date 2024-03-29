import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PhotoCollectionService } from './services/photo-collection.service';
import {
  CarouselControlPosition,
  CarouselType,
  IPhotoCarousel,
  PaginationType,
} from '@siddhesh-savant-photography/models';
import { PhotoCarouselComponent } from '@siddhesh-savant-photography/shared';

@Component({
  selector: 'app-photo-collection',
  standalone: true,
  imports: [CommonModule, PhotoCarouselComponent],
  templateUrl: './photo-collection.component.html',
  styleUrl: './photo-collection.component.scss',
})
export class PhotoCollectionComponent implements OnInit {
  public photoCarousel!: IPhotoCarousel;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly photoCollectionService: PhotoCollectionService
  ) {}

  ngOnInit(): void {
    const collectionId = this.activatedRoute.snapshot.params['id'];
    const collection =
      this.photoCollectionService.getPhotoCollection(collectionId);
    this.photoCarousel = {
      title: collection?.title,
      type: CarouselType.LOOP,
      timerInterval: 3000,
      photos: collection?.photos,
      nextButton: {
        icon: '',
        text: '',
      },
      previousButton: {
        icon: '',
        text: '',
      },
      carouselControlsPosition: CarouselControlPosition.DEFAULT,
      paginationType: PaginationType.PAGE_NUMBER_TOTAL,
    };
  }
}
