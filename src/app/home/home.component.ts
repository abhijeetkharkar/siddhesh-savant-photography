import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoCardComponent } from '@siddhesh-savant-photography/shared';
import { HomeService } from './services/home.service';
import { IPhotoCard } from '@siddhesh-savant-photography/models';

@Component({
  selector: 'siddhesh-savant-photography-home',
  standalone: true,
  imports: [CommonModule, PhotoCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public photoCards!: IPhotoCard[];

  constructor(private readonly homeService: HomeService) {}

  ngOnInit(): void {
    this.photoCards = this.homeService.getPhotoCards();
  }
}
