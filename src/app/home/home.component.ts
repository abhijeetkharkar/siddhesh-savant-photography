import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoCardComponent } from '@siddhesh-savant-photography/shared';
import { HomeService } from './services/home.service';
import { Breakpoint, IPhotoCard } from '@siddhesh-savant-photography/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PhotoCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public photoCardColumns!: IPhotoCard[][];
  public totalChunks: number = 1;

  constructor(private readonly homeService: HomeService) {}

  ngOnInit(): void {
    this.onResize(window.innerWidth);
    this.photoCardColumns = this.homeService.getPhotoCardColumns(this.totalChunks).map((column) =>
      column.map((photo, i) => {
        if (i === 0) {
          return {
            ...photo,
            eager: true,
          };
        } else {
          return photo;
        }
      })
    );
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
