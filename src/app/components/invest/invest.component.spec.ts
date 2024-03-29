import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InvestComponent } from './invest.component';

describe('InvestComponent', () => {
  let component: InvestComponent;
  let fixture: ComponentFixture<InvestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
