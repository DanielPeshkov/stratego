import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategoBoardComponent } from './stratego-board.component';

describe('StrategoBoardComponent', () => {
  let component: StrategoBoardComponent;
  let fixture: ComponentFixture<StrategoBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategoBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategoBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
