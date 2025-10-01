import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventContainer } from './event-container.component';

describe('EventContainer', () => {
  let component: EventContainer;
  let fixture: ComponentFixture<EventContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(EventContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
