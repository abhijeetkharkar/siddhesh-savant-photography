import { Route } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { PhotoCollectionComponent } from './photo-collection/photo-collection.component';
import { MegaProjectsComponent } from './mega-projects/mega-projects.component';
import { FeaturedComponent } from './featured/featured.component';
import { AdminComponent } from './admin/admin.component';
import { authGuardFn } from '@auth0/auth0-angular';

export const appRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'mega-projects', component: MegaProjectsComponent },
  { path: 'featured', component: FeaturedComponent },
  { path: 'connect', component: ConnectComponent },
  //{ path: 'admin', component: AdminComponent, canActivate: [authGuardFn] },
  { path: 'photo-collection/:id', component: PhotoCollectionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `home`
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
