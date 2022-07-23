import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialWidgetComponent } from './social-widget.component';

describe('SocialWidgetComponent', () => {
  let component: SocialWidgetComponent;
  let fixture: ComponentFixture<SocialWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
