import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {AngularMaterialModule} from '../ng-material/ng-material.module';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    AuthComponent
  ]
})

export class AuthModule { }
