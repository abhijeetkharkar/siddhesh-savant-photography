import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faInstagramSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { ComponentToggleService } from '@siddhesh-savant-photography/shared';
import { ToggleableComponent } from '@siddhesh-savant-photography/models';
import { map } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public showFooter$ = this.componentToggleService.showComponent$.pipe(
    map((componentToggleMap) => {
      if (
        !componentToggleMap ||
        componentToggleMap.get(ToggleableComponent.FOOTER) === undefined
      ) {
        return true;
      }
      return componentToggleMap.get(ToggleableComponent.FOOTER);
    })
  );
  
  constructor(
    private readonly componentToggleService: ComponentToggleService,
    private readonly faLibrary: FaIconLibrary
  ) {
    faLibrary.addIcons(faInstagramSquare, faInstagram);
  }
}
