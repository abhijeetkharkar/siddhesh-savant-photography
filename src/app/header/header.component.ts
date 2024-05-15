import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ComponentToggleService } from '@siddhesh-savant-photography/shared';
import { ToggleableComponent } from 'models/src/lib/enums';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public showHeader$ = this.componentToggleService.showComponent$.pipe(
    map((componentToggleMap) => {
      if (
        !componentToggleMap ||
        componentToggleMap.get(ToggleableComponent.HEADER) === undefined
      ) {
        return true;
      }
      return componentToggleMap.get(ToggleableComponent.HEADER);
    })
  );

  constructor(
    private readonly componentToggleService: ComponentToggleService
  ) {}
}
