import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FilterEvent } from '../../../core/models/filter-event.model';
import { FiltersMaterialModule } from '../filters.module';

@Component({
  selector: 'app-event-selector',
  imports: [CommonModule, ReactiveFormsModule, FiltersMaterialModule],
  templateUrl: './event-selector.component.html',
})
export class EventSelector {
  @Input({ required: true }) filteredEvents$: Observable<FilterEvent[]> = of([]);
  @Input({ required: true }) index: number = 0;
  @Input({ required: true }) eventGroup: FormGroup = new FormGroup({});

  displayEvent(event: FilterEvent): string {
    return event?.type ?? '';
  }
}
