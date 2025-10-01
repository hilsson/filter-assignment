import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
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
import { filterEvents } from '../../../core/utils/filter-event.utils';
import { AttributeSelector } from '../attribute-selector/attribute-selector.component';
import { FiltersMaterialModule } from '../filters.module';

@Component({
  selector: 'app-event-selector',
  imports: [CommonModule, ReactiveFormsModule, FiltersMaterialModule, AttributeSelector],
  templateUrl: './event-selector.component.html',
  styleUrl: './event-selector.component.scss',
})
export class EventSelector {
  @Input() events: FilterEvent[] = [];

  form: FormGroup;
  filteredEvents$: Observable<FilterEvent[]>[] = [];
  operators = ['equals', 'in between', 'greater than', 'less than'];

  constructor(private fb: FormBuilder) {
    this.form = new FormGroup({
      events: new FormArray([]),
    });
  }

  get eventsForm(): FormArray<FormGroup> {
    return this.form.get('events') as FormArray<FormGroup>;
  }

  getAttributes(eventIndex: number): FormArray<FormGroup> {
    return this.eventsForm.at(eventIndex).get('attributes') as FormArray<FormGroup>;
  }

  addEvent(): void {
    const eventGroup = this.fb.group<EventGroupControls>({
      event: new FormControl<FilterEvent | string | null>(null),
      attributes: this.fb.array<FormGroup<EventAttributeControls>>([]),
    });

    this.eventsForm.push(eventGroup);

    const eventControl = eventGroup.get('event');

    if (!eventControl) {
      return;
    }

    this.filterEvent(eventControl);
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

  getEventGroup(eventIndex: number): FormGroup<EventGroupControls> | null {
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

    console.log('added attribute', this.form.value);
  }

  displayEvent(event: FilterEvent): string {
    return event?.type ?? '';
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
