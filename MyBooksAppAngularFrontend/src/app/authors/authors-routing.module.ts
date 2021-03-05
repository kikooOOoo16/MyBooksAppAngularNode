import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorsComponent} from './authors.component';
import {AuthorNotSelectedComponent} from './author-not-selected/author-not-selected.component';
import {AuthorDetailsComponent} from './author-details/author-details.component';
import {AuthorsResolverService} from './authors-resolver.service';

const routes: Routes = [
  {
    path: '', component: AuthorsComponent,
    resolve: [AuthorsResolverService],
    children: [
      {
        path: '',
        component: AuthorNotSelectedComponent
      },
      {
        path: ':id',
        component: AuthorDetailsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AuthorsRoutingModule { }
