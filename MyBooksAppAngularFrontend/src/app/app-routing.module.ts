import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/authors', pathMatch: 'full'
  },
  {
    path: 'authors',
    loadChildren: () => import('./authors/authors.module').then(module => module.AuthorsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
