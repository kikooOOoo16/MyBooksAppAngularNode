import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from './auth.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    AuthComponent
  ]
})

export class AuthModule { }
