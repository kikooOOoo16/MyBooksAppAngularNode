import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorNotSelectedComponent } from './author-not-selected.component';

describe('AuthorNotSelectedComponent', () => {
  let component: AuthorNotSelectedComponent;
  let fixture: ComponentFixture<AuthorNotSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorNotSelectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorNotSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
