import { Route } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { PhotoCollectionComponent } from './photo-collection/photo-collection.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';

export const appRoutes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'photo-collection/:id', component: PhotoCollectionComponent},
  { path: 'photos/:id', component: PhotoGalleryComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `about`
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
