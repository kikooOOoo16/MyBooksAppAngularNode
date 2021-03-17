import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthorsComponent} from './authors.component';
import {AuthorListComponent} from './author-list/author-list.component';
import {AuthorDetailsComponent} from './author-details/author-details.component';
import {RouterModule} from '@angular/router';
import {AuthorNotSelectedComponent} from './author-not-selected/author-not-selected.component';
import {AuthorsRoutingModule} from './authors-routing.module';
import {AuthorItemComponent} from './author-item/author-item.component';
import {TruncateTextPipe} from '../shared/pipes/truncate-text.pipe';
import {AngularMaterialModule} from '../ng-material/ng-material.module';


@NgModule({
  declarations: [
    AuthorsComponent,
    AuthorListComponent,
    AuthorDetailsComponent,
    AuthorNotSelectedComponent,
    AuthorItemComponent,
    TruncateTextPipe],
  imports: [
    CommonModule,
    RouterModule,
    AuthorsRoutingModule,
    AngularMaterialModule
  ]
})
export class AuthorsModule { }
