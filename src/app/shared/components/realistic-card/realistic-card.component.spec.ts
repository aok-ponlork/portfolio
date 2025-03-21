import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealisticCardComponent } from './realistic-card.component';

describe('RealisticCardComponent', () => {
  let component: RealisticCardComponent;
  let fixture: ComponentFixture<RealisticCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealisticCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealisticCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
