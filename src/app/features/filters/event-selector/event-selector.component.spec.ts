import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSelector } from './event-selector.component';

describe('EventSelector', () => {
  let component: EventSelector;
  let fixture: ComponentFixture<EventSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(EventSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
