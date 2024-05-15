import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  ComponentToggleService,
  PhotoCarouselComponent,
  PhotoService,
} from '@siddhesh-savant-photography/shared';
import {
  IPhotoCarousel,
  CarouselType,
  CarouselControlPosition,
  PaginationType,
  IPhoto,
  ToggleableComponent,
} from '@siddhesh-savant-photography/models';
import { EMPTY, Observable, catchError, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [
    CommonModule,
    PhotoCarouselComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './photo-gallery.component.html',
  styleUrl: './photo-gallery.component.scss',
})
export class PhotoGalleryComponent implements OnInit, OnDestroy {
  public photoCarousel$: Observable<IPhotoCarousel> =
    new Observable<IPhotoCarousel>();
  public route = '';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly componentToggleService: ComponentToggleService,
    private readonly photoService: PhotoService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.componentToggleService.setShowComponent(
      ToggleableComponent.HEADER,
      false
    );
    this.componentToggleService.setShowComponent(
      ToggleableComponent.FOOTER,
      false
    );
    this.photoCarousel$ = combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.queryParams,
    ]).pipe(
      map(([params, queryParams]) => {
        const photoId: string = params['id'];
        let photoCards;
        this.route = queryParams['route'];
        switch (this.route) {
          case '/mega-projects':
            photoCards = this.photoService.getMegaProjectsPhotoCardsV2();
            break;
          default:
            photoCards = this.photoService.getHomeAndSpacesPhotoCardsV2();
        }
        if (!photoCards.find((photoCard) => photoCard.photoId === photoId)) {
          throw new Error('Invalid PhotoId');
        }
        return {
          currentPhotoId: photoId,
          title: undefined,
          type: CarouselType.LOOP,
          timerInterval: 3000,
          photos: photoCards.map((photoCard) => {
            return {
              altText: photoCard.thumbnailAltText,
              description: photoCard.description,
              id: photoCard.photoId,
              title: photoCard.title,
              url: photoCard.thumbnailUrl,
              width: photoCard.width,
              height: photoCard.height,
            } as IPhoto;
          }),
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
        } as IPhotoCarousel;
      }),
      catchError((_) => {
        this.router.navigateByUrl('/');
        return EMPTY;
      })
    );
  }

  ngOnDestroy(): void {
    this.componentToggleService.setShowComponent(
      ToggleableComponent.HEADER,
      true
    );
    this.componentToggleService.setShowComponent(
      ToggleableComponent.FOOTER,
      true
    );
  }
}
