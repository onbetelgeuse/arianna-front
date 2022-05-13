import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessRedirectComponent } from './success-redirect.component';

describe('SuccessRedirectComponent', () => {
  let component: SuccessRedirectComponent;
  let fixture: ComponentFixture<SuccessRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
