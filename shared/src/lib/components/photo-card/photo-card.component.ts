import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Breakpoint, IPhotoCard } from '@siddhesh-savant-photography/models';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

export const IMG_WIDTH_LARGE_DESKTOP = 560;
export const IMG_WIDTH_DESKTOP = 480;
export const IMG_WIDTH_TAB = 400;
export const IMG_WIDTH_MOBILE = 320;

@Component({
  selector: 'lib-photo-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
  ],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.scss',
})
export class PhotoCardComponent implements OnInit {
  @Input() photoCard!: IPhotoCard;
  @Input() totalColumns = 0;
  @Input() route = 'home';
  private readonly TOTAL_HORIZONTAL_MARGIN_WIDE_SCREEN = 64;  
  private readonly TOTAL_HORIZONTAL_MARGIN_MOBILE = 32;
  private readonly ROW_GAP = 16;
  private readonly EXTRA_REDUCTION_FACTOR = 0.01;
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
  onResize(screenWidth: number) {
    let margin = this.TOTAL_HORIZONTAL_MARGIN_WIDE_SCREEN;
    if (screenWidth < Breakpoint.BREAKPOINT_5) {
      margin = this.TOTAL_HORIZONTAL_MARGIN_MOBILE;
      this.backgroundWidth = Breakpoint.BREAKPOINT_4;
    } else if (screenWidth < Breakpoint.BREAKPOINT_8) {
      this.backgroundWidth = Breakpoint.BREAKPOINT_7;
    } else if (screenWidth < Breakpoint.BREAKPOINT_11) {
      this.backgroundWidth = Breakpoint.BREAKPOINT_9;
    } else {
      this.backgroundWidth = Breakpoint.BREAKPOINT_12;
    }
    this.width =
      (screenWidth -
        margin -
        (this.totalColumns - 1) * this.ROW_GAP -
        this.EXTRA_REDUCTION_FACTOR * screenWidth) /
      this.totalColumns;
    this.height =
      ((this.photoCard?.height ?? 0) * this.width) /
      (this.photoCard?.width ?? 0);
    this.backgroundHeight = this.height;
  }

  public onLoad() {
    this.loading = false;
  }

  public openCollection(collectionId: string) {
    this.router.navigateByUrl(`/photo-collection/${collectionId}`);
  }

  public openPhotos(photoId: string) {
    this.router.navigate([`/photos/${photoId}`], {queryParams: {route: this.route}});
  }
}
