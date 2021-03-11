import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from './header/header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppTrackScrollDirective} from './shared/directives/app-track-scroll.directive';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AuthorsEffects} from './authors/store/authors.effects';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BooksEffects} from './books/store/books.effects';
import {AuthEffects} from './auth/store/auth.effects';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import {MatDialogModule} from '@angular/material/dialog';
import * as fromApp from './store/app.reducer';
import {MatButtonModule} from '@angular/material/button';
import {ErrorInterceptor} from './error-handler/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppTrackScrollDirective,
    ErrorHandlerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthorsEffects, BooksEffects, AuthEffects]),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass:  ErrorInterceptor, multi: true }
  ],
  entryComponents: [ErrorHandlerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
