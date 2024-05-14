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
import { PhotoCarouselComponent } from '@siddhesh-savant-photography/shared';
import {
  IPhotoCarousel,
  CarouselType,
  CarouselControlPosition,
  PaginationType,
  IPhoto,
} from '@siddhesh-savant-photography/models';
import { EMPTY, Observable, catchError, map, of } from 'rxjs';
import { HeaderService } from '../header/services/header.service';
import { HomeService } from '../home/services/home.service';
import { FooterService } from '../footer/services/footer.service';

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

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly headerService: HeaderService,
    private readonly footerService: FooterService,
    private readonly homeService: HomeService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.headerService.setShowHeader(false);
    this.footerService.setShowFooter(false);
    this.photoCarousel$ = this.activatedRoute.params.pipe(
      map((params) => {
        const photoId: string = params['id'];
        const photoCards = this.homeService.getPhotoCardsV2();
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
    this.headerService.setShowHeader(true);
  }
}
