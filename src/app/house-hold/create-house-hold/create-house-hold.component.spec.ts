import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHouseHoldComponent } from './create-house-hold.component';

describe('CreateHouseHoldComponent', () => {
  let component: CreateHouseHoldComponent;
  let fixture: ComponentFixture<CreateHouseHoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHouseHoldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHouseHoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
