import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { PhotoCollectionService } from './services/photo-collection.service';
import {
  CarouselControlPosition,
  CarouselType,
  IPhotoCarousel,
  PaginationType,
} from '@siddhesh-savant-photography/models';
import { PhotoCarouselComponent } from '@siddhesh-savant-photography/shared';
import { MatButtonModule } from '@angular/material/button';
import { HeaderService } from '../header/services/header.service';
import { MatIconModule } from '@angular/material/icon';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-photo-collection',
  standalone: true,
  imports: [
    CommonModule,
    PhotoCarouselComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './photo-collection.component.html',
  styleUrl: './photo-collection.component.scss',
})
export class PhotoCollectionComponent implements OnInit, OnDestroy {
  public photoCarousel$: Observable<IPhotoCarousel> = new Observable<IPhotoCarousel>();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly headerService: HeaderService,
    private readonly photoCollectionService: PhotoCollectionService
  ) {}

  ngOnInit(): void {
    this.headerService.setShowHeader(false);
    this.photoCarousel$ = this.activatedRoute.params.pipe(
      map((params) => {
        const collectionId: string = params['id'];
        const collectionItems =
          this.photoCollectionService.getPhotoCollectionItems(collectionId);
        return {
          title: collectionItems?.title,
          type: CarouselType.LOOP,
          timerInterval: 3000,
          photos: collectionItems?.photos,
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
          previousCollection: collectionItems?.previous,
          nextCollection: collectionItems?.next,
        } as IPhotoCarousel;
      })
    );
  }

  ngOnDestroy(): void {
    this.headerService.setShowHeader(true);
  }
}