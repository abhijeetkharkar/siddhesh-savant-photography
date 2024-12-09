import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ConnectComponent } from './connect/connect.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthModule } from '@auth0/auth0-angular';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    AboutComponent,
    ConnectComponent,
    PageNotFoundComponent,
    FooterComponent,
    AuthModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
