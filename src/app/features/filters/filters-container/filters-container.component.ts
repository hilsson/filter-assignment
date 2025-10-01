import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { FilterEvent } from '../../../core/models/filter-event.model';
import { EventService } from '../../../core/services/event.service';
import { EventContainer } from '../event-container/event-container.component';

@Component({
  selector: 'app-filters-container',
  imports: [CommonModule, EventContainer],
  templateUrl: './filters-container.component.html',
  styleUrl: './filters-container.component.scss',
})
export class FiltersContainer implements OnInit {
  events$: Observable<FilterEvent[]> = of([]);

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.events$ = this.eventService.getEvents().pipe(map((result) => result.events));
  }
}
