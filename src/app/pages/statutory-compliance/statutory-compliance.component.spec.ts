import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutoryComplianceComponent } from './statutory-compliance.component';

describe('StatutoryComplianceComponent', () => {
  let component: StatutoryComplianceComponent;
  let fixture: ComponentFixture<StatutoryComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutoryComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatutoryComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
