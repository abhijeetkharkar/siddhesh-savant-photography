import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ComponentToggleService } from '@siddhesh-savant-photography/shared';
import { ToggleableComponent } from '@siddhesh-savant-photography/models';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  constructor(
    private readonly componentToggleService: ComponentToggleService
  ) {}

  ngOnInit(): void {
    this.componentToggleService.setShowComponent(
      ToggleableComponent.HEADER,
      false
    );
  }

  ngOnDestroy(): void {
    this.componentToggleService.setShowComponent(
      ToggleableComponent.HEADER,
      true
    );
  }
}
