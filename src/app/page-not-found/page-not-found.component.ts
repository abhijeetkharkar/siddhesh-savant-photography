import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HeaderService } from '../header/services/header.service';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  constructor(private readonly headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.setShowHeader(false);
  }

  ngOnDestroy(): void {
    this.headerService.setShowHeader(true);
  }
}
