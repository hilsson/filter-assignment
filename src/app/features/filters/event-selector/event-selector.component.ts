import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map, startWith } from 'rxjs/operators';
import { FilterEvent } from '../../../core/models/filter-event.model';
import { FiltersMaterialModule } from '../filters.module';

@Component({
  selector: 'app-event-selector',
  imports: [CommonModule, ReactiveFormsModule, FiltersMaterialModule],
  templateUrl: './event-selector.component.html',
  styleUrl: './event-selector.component.scss',
})
export class EventSelector implements OnInit {
  @Input() events: FilterEvent[] = [];

  form: FormGroup;
  filteredEvents$: Observable<FilterEvent[]> = of([]);

  constructor() {
    this.form = new FormGroup({
      event: new FormControl(null),
      attribute: new FormControl(null),
      operator: new FormControl('equals'),
      value: new FormControl(''),
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

  displayEvent(event: FilterEvent | null): string {
    return event?.type ?? '';
  }
}
