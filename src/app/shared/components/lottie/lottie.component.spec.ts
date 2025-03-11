import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottieCoreComponent } from './lottie.component';

describe('LottieComponent', () => {
  let component: LottieCoreComponent;
  let fixture: ComponentFixture<LottieCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LottieCoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LottieCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
