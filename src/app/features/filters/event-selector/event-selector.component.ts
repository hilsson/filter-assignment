import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map, startWith } from 'rxjs/operators';
import { FilterEvent } from '../../../core/models/filter-event.model';
import { AttributeSelector } from '../attribute-selector/attribute-selector.component';
import { FiltersMaterialModule } from '../filters.module';

@Component({
  selector: 'app-event-selector',
  imports: [CommonModule, ReactiveFormsModule, FiltersMaterialModule, AttributeSelector],
  templateUrl: './event-selector.component.html',
  styleUrl: './event-selector.component.scss',
})
export class EventSelector implements OnInit {
  @Input() events: FilterEvent[] = [];

  form: FormGroup;
  filteredEvents$: Observable<FilterEvent[]> = of([]);
  operators = ['equals', 'in between', 'greater than', 'less than'];

  constructor(private fb: FormBuilder) {
    this.form = new FormGroup({
      event: new FormControl(null),
      rows: new FormArray([]),
    });
  }

  ngOnInit(): void {
    const eventControl = this.form.get('event');

    if (!eventControl) {
      return;
    }

    this.filteredEvents$ = eventControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const type = typeof value === 'string' ? value : value?.type;
        return type ? this._filterEvents(type as string) : this.events.slice();
      })
    );
  }

  private _filterEvents(value: string): FilterEvent[] {
    const filterValue = value.toLowerCase();

    return this.events.filter((event) => event.type.toLowerCase().includes(filterValue));
  }

  get selectedEvent(): FilterEvent {
    return this.form.get('event')?.value;
  }

  get rows(): FormArray<FormGroup> {
    return this.form.get('rows') as FormArray<FormGroup>;
  }

  addRow(): void {
    if (!this.selectedEvent) {
      return;
    }

    this.rows.push(
      this.fb.group({
        attribute: [null],
        operator: ['equals'],
        value: [''],
      })
    );

    console.log('added row', this.form.value);
  }

  displayEvent(event: FilterEvent): string {
    return event?.type ?? '';
  }
}
