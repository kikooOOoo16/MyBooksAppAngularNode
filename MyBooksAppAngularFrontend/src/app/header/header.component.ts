import {Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {faBook, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  faBook = faBook;
  faSignIn = faSignInAlt;
  faSignOut = faSignOutAlt;
  isDropdownActive = '';
  isAuthenticated = false;
  @ViewChild('navbarDropdownMenuLink', {static: true}) navbarDropdownMenuLink: ElementRef;
  @ViewChild('navbarMainListDiv', {static: true}) navbarMainListDiv: ElementRef;
  @ViewChild('navbar', {static: true}) navbar: ElementRef;
  @HostListener('window:scroll', ['$event'])
  toggleClass(event): void {
    if (window.pageYOffset > 0) {
      this.renderer.addClass(this.navbar.nativeElement, 'affix');
      this.renderer.addClass(this.navbarDropdownMenuLink.nativeElement, 'affix');
    } else {
      this.renderer.removeClass(this.navbar.nativeElement, 'affix');
      this.renderer.removeClass(this.navbarDropdownMenuLink.nativeElement, 'affix');
    }
  }

  constructor(private renderer: Renderer2, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.authSub = this.store.select('auth')
      .pipe(
        map(authState => authState.user)
      ).subscribe(user => {
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  toggleDropdown(): void {
    if (this.isDropdownActive === 'active') {
      this.renderer.removeClass(this.navbarDropdownMenuLink.nativeElement, 'active');
      this.renderer.removeClass(this.navbarMainListDiv.nativeElement, 'show_list');
      this.isDropdownActive = '';
    } else {
      this.renderer.addClass(this.navbarDropdownMenuLink.nativeElement, 'active');
      this.renderer.addClass(this.navbarMainListDiv.nativeElement, 'show_list');
      this.isDropdownActive = 'active';
    }
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
