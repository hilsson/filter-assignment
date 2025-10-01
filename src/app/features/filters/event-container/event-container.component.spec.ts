import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AttributeSelector } from '../attribute-selector/attribute-selector.component';
import { EventSelector } from '../event-selector/event-selector.component';
import { FiltersMaterialModule } from '../filters.module';
import { EventContainer } from './event-container.component';

describe('EventContainer', () => {
  let component: EventContainer;
  let fixture: ComponentFixture<EventContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FiltersMaterialModule, AttributeSelector, EventSelector],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(EventContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with one event form group', () => {
    expect(component.eventsForm.length).toBe(1);
  });

  it('should add a new event form group when addEvent is called', () => {
    component.addEvent();
    expect(component.eventsForm.length).toBe(2);
  });

  it('should remove an event form group when removeEvent is called', () => {
    component.addEvent();
    const initialLength = component.eventsForm.length;
    component.removeEvent(0);
    expect(component.eventsForm.length).toBe(initialLength - 1);
  });

  it('should add an attribute to an event group when addAttribute is called', () => {
    const eventGroup = component.eventsForm.at(0);
    eventGroup.get('event')?.setValue({ type: 'page-visit' });

    component.addAttribute(0);
    expect(component.getAttributes(0).length).toBe(1);
  });

  it('should return a data model with events and attributes', () => {
    const eventGroup = component.eventsForm.at(0);
    eventGroup.get('event')?.setValue({ type: 'page-visit' });
    component.addAttribute(0);
    component.getAttributes(0).at(0).setValue({
      attribute: 'latitude',
      operator: 'equals',
      value: '35.6895',
    });

    const model = component.getDataModel();
    expect(model.length).toBe(1);
    expect(model[0].event).toBe('page-visit');
    expect(model[0].attributes[0].attribute).toBe('latitude');
  });
});
