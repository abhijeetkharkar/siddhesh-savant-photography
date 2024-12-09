import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PhotoCardComponent,
  PhotoService,
} from '@siddhesh-savant-photography/shared';
import { Breakpoint, IPhotoCard, IPhotoCollectionCard } from '@siddhesh-savant-photography/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PhotoCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public photoCollectionCardColumns!: IPhotoCollectionCard[][];
  public totalChunks: number = 1;
  public route = '';

  constructor(private readonly photoService: PhotoService, private readonly router: Router) {}

  ngOnInit(): void {
    this.onResize(window.innerWidth);
    this.photoCollectionCardColumns = this.photoService.getHomeAndSpacesCollectionsCardColumns(
      this.totalChunks
    );
    this.route = this.router.url;
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    if (width < Breakpoint.BREAKPOINT_5) {
      this.totalChunks = 1;
    } else if (width < Breakpoint.BREAKPOINT_8) {
      this.totalChunks = 2;
    } else if (width < Breakpoint.BREAKPOINT_11) {
      this.totalChunks = 3;
    } else {
      this.totalChunks = 4;
    }
  }
}
