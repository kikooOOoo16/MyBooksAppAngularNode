import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth-guard';
import {ProfileComponent} from './profile.component';
import {ProfileBooksListResolverService} from './profile-books-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    resolve: [ProfileBooksListResolverService],
    component: ProfileComponent
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
export class ProfileRoutingModule { }
