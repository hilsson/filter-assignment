import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  EventAttributeControls,
  EventGroupControls,
  FilterEvent,
} from '../../../core/models/filter-event.model';
import { filterEvents, OPERATORS } from '../../../core/utils/filter-event.utils';
import { AttributeSelector } from '../attribute-selector/attribute-selector.component';
import { EventSelector } from '../event-selector/event-selector.component';
import { FiltersMaterialModule } from '../filters.module';

@Component({
  selector: 'app-event-container',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FiltersMaterialModule,
    AttributeSelector,
    EventSelector,
  ],
  templateUrl: './event-container.component.html',
  styleUrl: './event-container.component.scss',
})
export class EventContainer {
  @Input() events: FilterEvent[] = [];

  form: FormGroup;
  filteredEvents$: Observable<FilterEvent[]>[] = [];
  operators = OPERATORS;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      events: this.fb.array([]),
    });
    this.addEvent();
  }

  get eventsForm(): FormArray<FormGroup> {
    return this.form.get('events') as FormArray<FormGroup>;
  }

  getAttributes(eventIndex: number): FormArray<FormGroup> {
    return this.eventsForm.at(eventIndex).get('attributes') as FormArray<FormGroup>;
  }

  addEvent(): void {
    const eventGroup = this.fb.group<EventGroupControls>({
      event: this.fb.control<FilterEvent | string | null>(null),
      attributes: this.fb.array<FormGroup<EventAttributeControls>>([]),
    });

    this.eventsForm.push(eventGroup);

    const eventControl = eventGroup.get('event');

    if (!eventControl) {
      return;
    }

    this.filterEvent(eventControl);
  }

  removeEvent(index: number): void {
    this.eventsForm.removeAt(index);
    this.filteredEvents$.splice(index, 1);
  }

  filterEvent(eventControl: AbstractControl): void {
    this.filteredEvents$.push(
      eventControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const type = typeof value === 'string' ? value : value?.type;
          return type ? filterEvents(this.events, type) : this.events.slice();
        })
      )
    );
  }

  private getEventGroup(eventIndex: number): FormGroup<EventGroupControls> | null {
    const group = this.eventsForm.at(eventIndex);
    return group ? (group as FormGroup<EventGroupControls>) : null;
  }

  addAttribute(eventIndex: number): void {
    const eventGroup = this.getEventGroup(eventIndex);
    if (!eventGroup) {
      return;
    }

    const selectedEvent = eventGroup.get('event')?.value;
    if (!selectedEvent) {
      return;
    }

    const attributes = this.getAttributes(eventIndex);

    attributes.push(
      this.fb.group({
        attribute: [null],
        operator: ['equals'],
        value: [''],
      })
    );
  }

  getDataModel() {
    return this.eventsForm.controls.map((eventGroup: FormGroup) => {
      const event = eventGroup.get('event')?.value.type;
      const attributes = this.extractAttributes(eventGroup);
      return { event, attributes };
    });
  }

  private extractAttributes(
    eventGroup: FormGroup
  ): Array<{ attribute: any; operator: any; value: any }> {
    const attributesArray = eventGroup.get('attributes') as FormArray;
    return attributesArray.controls.map((control) => (control as FormGroup).value);
  }

  applyFilters(): void {
    const model = this.getDataModel();
    console.log('Applied Filters:', model);
  }
}
