import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  events: FilterEvent[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.events = this.eventService.getEvents();
  }
}
