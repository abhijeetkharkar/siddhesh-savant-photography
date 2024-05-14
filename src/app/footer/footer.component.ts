import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagramSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FooterService } from './services/footer.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public showFooter$ = this.footerService.showFooter$;
  constructor(private readonly footerService: FooterService, private readonly faLibrary: FaIconLibrary) {
    faLibrary.addIcons(faInstagramSquare, faInstagram);
  }
}
