import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Breakpoint, IPhotoCard, ScreenSize } from '@siddhesh-savant-photography/models';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

export const IMG_WIDTH_DESKTOP = 480;
export const IMG_WIDTH_TAB = 400;
export const IMG_WIDTH_MOBILE = 320;

@Component({
  selector: 'lib-photo-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.scss',
})
export class PhotoCardComponent implements OnInit {
  @Input() photoCard!: IPhotoCard;
  public showCard = false;
  public loading = true;
  public width = 0;
  public height = 0;
  public backgroundWidth = 0;
  public backgroundHeight = 0;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.showCard = !!this.photoCard.thumbnailUrl;
    this.onResize(window.innerWidth);
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    if (width < Breakpoint.BREAKPOINT_5) {
      this.width = IMG_WIDTH_MOBILE;
      this.backgroundWidth = Breakpoint.BREAKPOINT_4;
    } else if (width < Breakpoint.BREAKPOINT_8) {
      this.width = IMG_WIDTH_TAB;
      this.backgroundWidth = Breakpoint.BREAKPOINT_7;
    } else {
      this.width = IMG_WIDTH_DESKTOP;
      this.backgroundWidth = Breakpoint.BREAKPOINT_10;
    }
    this.height = (this.photoCard?.height ?? 0) * this.width / (this.photoCard?.width ?? 0);
    this.backgroundHeight = this.height;
  }

  public onLoad() {
    this.loading = false;
  }

  public openCollection(collectionId: string) {
    this.router.navigateByUrl(`/photo-collection/${collectionId}`);
  }

  public openPhotos(photoId: string) {
    this.router.navigateByUrl(`/photos/${photoId}`);
  }
}
