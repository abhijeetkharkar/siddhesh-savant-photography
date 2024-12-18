import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  CarouselType,
  IPhoto,
  IPhotoCard,
  IPhotoCarousel,
  IPhotoCollectionCard,
  URL_REGEX,
} from '@siddhesh-savant-photography/models';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'lib-photo-carousel',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './photo-carousel.component.html',
  styleUrl: './photo-carousel.component.scss',
})
export class PhotoCarouselComponent implements OnChanges, OnDestroy {
  @Input() photoCarousel!: IPhotoCarousel | null;
  @Input() route!: string;
  public showCarousel = false;
  public filteredPhotos: IPhoto[] = [];
  public currentIndex = 0;
  public totalLength = 0;
  public enablePrevious = false;
  public enableNext = false;
  public previousIcon = 'arrow_circle_left';
  public nextIcon = 'arrow_circle_right';
  public previousCollection:
    | Pick<IPhotoCollectionCard, 'collectionId' | 'title'>
    | undefined;
  public nextCollection:
    | Pick<IPhotoCollectionCard, 'collectionId' | 'title'>
    | undefined;
  private carouselIntervalId!: ReturnType<typeof setInterval>;

  ngOnChanges(): void {
    this.showCarousel = this.isInputValid();
    this.currentIndex =
      this.filteredPhotos.findIndex(
        (photo) => photo.id === this.photoCarousel?.currentPhotoId
      ) ?? 0;
    this.enablePrevious = this.photoCarousel?.type === CarouselType.LOOP;
    this.enableNext =
      this.photoCarousel?.type === CarouselType.NORMAL ||
      this.photoCarousel?.type === CarouselType.LOOP;
    if (this.photoCarousel?.previousButton.icon) {
      this.previousIcon = this.photoCarousel.previousButton.icon;
    }
    if (this.photoCarousel?.nextButton.icon) {
      this.nextIcon = this.photoCarousel.nextButton.icon;
    }
    if (
      this.showCarousel &&
      this.photoCarousel?.type === CarouselType.AUTOMATIC
    ) {
      this.carouselIntervalId = setInterval(
        () => this.goToNextLoop(),
        this.photoCarousel.timerInterval
      );
    }
    this.previousCollection = this.photoCarousel?.previousCollection;
    this.nextCollection = this.photoCarousel?.nextCollection;
  }

  ngOnDestroy(): void {
    if (this.carouselIntervalId) {
      clearInterval(this.carouselIntervalId);
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'ArrowLeft') {
      this.goToPrevious();
    }
    if (event.code == 'ArrowRight') {
      this.goToNext();
    }
  }

  public goToPrevious() {
    switch (this.photoCarousel?.type) {
      case CarouselType.NORMAL:
        this.goToPreviousNormal();
        break;
      case CarouselType.LOOP:
        this.goToPreviousLoop();
        break;
      default:
        break;
    }
  }

  public goToNext() {
    switch (this.photoCarousel?.type) {
      case CarouselType.NORMAL:
        this.goToNextNormal();
        break;
      case CarouselType.LOOP:
        this.goToNextLoop();
        break;
      default:
        break;
    }
  }

  private isInputValid(): boolean {
    if (!this.photoCarousel) {
      return false;
    }

    if (this.photoCarousel.photos?.length === 0) {
      return false;
    }

    const filteredPhotos = this.photoCarousel.photos; /* .filter((photo) =>
      new RegExp(URL_REGEX).test(photo.url)
    ) */
    if (filteredPhotos?.length === 0) {
      return false;
    }

    this.filteredPhotos = filteredPhotos ?? [];
    this.totalLength = filteredPhotos?.length ?? 0;

    if (this.photoCarousel.type === CarouselType.AUTOMATIC) {
      return !!this.photoCarousel.timerInterval;
    }

    return true;
  }

  private goToPreviousNormal() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    this.toggleControls();
  }

  private goToNextNormal() {
    if (this.currentIndex < this.totalLength - 1) {
      this.currentIndex++;
    }
    this.toggleControls();
  }

  private goToPreviousLoop() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.totalLength - 1;
    } else {
      this.currentIndex = (this.currentIndex - 1) % this.totalLength;
    }
  }

  private goToNextLoop() {
    this.currentIndex = (this.currentIndex + 1) % this.totalLength;
  }

  private toggleControls() {
    this.enableNext = this.currentIndex < this.totalLength - 1;
    this.enablePrevious = this.currentIndex > 0;
  }
}
