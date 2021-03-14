import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/authors', pathMatch: 'full'
  },
  {
    path: 'authors',
    loadChildren: () => import('./authors/authors.module').then(module => module.AuthorsModule)
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then(module => module.BooksModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(module => module.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
