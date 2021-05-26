import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UnlockWalletComponent } from './unlock-wallet.component';

describe('UnlockWalletComponent', () => {
  let component: UnlockWalletComponent;
  let fixture: ComponentFixture<UnlockWalletComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlockWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
