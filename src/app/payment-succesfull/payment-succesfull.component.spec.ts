import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSuccesfullComponent } from './payment-succesfull.component';

describe('PaymentSuccesfullComponent', () => {
  let component: PaymentSuccesfullComponent;
  let fixture: ComponentFixture<PaymentSuccesfullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSuccesfullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSuccesfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
