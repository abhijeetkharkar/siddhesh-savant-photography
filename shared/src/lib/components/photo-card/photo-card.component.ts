import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IPhotoCard } from '@siddhesh-savant-photography/models';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'lib-photo-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink, RouterLinkActive],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.scss',
})
export class PhotoCardComponent implements OnInit {
  @Input() photoCard!: IPhotoCard;
  public showCard = false;
  public loading = true;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.showCard = !!this.photoCard.thumbnailUrl;
  }

  public onLoad() {
    this.loading = false;
  }

  public openCollection(collectionId: string) {
    this.router.navigateByUrl(`/photo-collection/${collectionId}`);
  }
}
