import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTestPageComponent } from './book-test-page.component';

describe('BookTestPageComponent', () => {
  let component: BookTestPageComponent;
  let fixture: ComponentFixture<BookTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookTestPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
