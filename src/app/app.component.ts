import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { HeaderService } from './header/services/header.service';
import { FooterComponent } from './footer/footer.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    AboutComponent,
    ContactUsComponent,
    PageNotFoundComponent,
    FooterComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'siddhesh-savant-photography';
  constructor(private readonly headerService: HeaderService){}
}
