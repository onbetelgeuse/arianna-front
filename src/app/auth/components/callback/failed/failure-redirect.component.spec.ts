import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureRedirectComponent } from './failure-redirect.component';

describe('FailureRedirectComponent', () => {
  let component: FailureRedirectComponent;
  let fixture: ComponentFixture<FailureRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailureRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailureRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
