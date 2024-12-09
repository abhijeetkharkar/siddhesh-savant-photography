import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import {
  CarouselControlPosition,
  CarouselType,
  IPhotoCarousel,
  PaginationType,
  ToggleableComponent,
} from '@siddhesh-savant-photography/models';
import {
  ComponentToggleService,
  PhotoCarouselComponent,
  PhotoService,
} from '@siddhesh-savant-photography/shared';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable, combineLatest, map } from 'rxjs';
import { featuredCollections, homeAndSpacesCollections, megaProjectsCollections } from '@siddhesh-savant-photography/mocking';

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
  public photoCarousel$: Observable<IPhotoCarousel> =
    new Observable<IPhotoCarousel>();
  public route = '';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly componentToggleService: ComponentToggleService,
    private readonly photoService: PhotoService
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
        const collectionId: string = params['id'];
        this.route = queryParams['route'];
        let collection;
        switch(this.route) {
          case '/home':
            collection = this.photoService.getCollection(collectionId, homeAndSpacesCollections());
            break;
          case '/mega-projects':
            collection = this.photoService.getCollection(collectionId, megaProjectsCollections());
            break;
          case '/featured':
            collection = this.photoService.getCollection(collectionId, featuredCollections());
            break;
          default:
            collection = this.photoService.getCollection(collectionId, homeAndSpacesCollections());
        }
        return {
          title: collection?.title,
          type: CarouselType.LOOP,
          timerInterval: 3000,
          currentPhotoId: collection?.photos[0].id,
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
          previousCollection: collection?.previous,
          nextCollection: collection?.next,
        } as IPhotoCarousel;
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
