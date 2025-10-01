import { FilterEvent } from '../models/filter-event.model';

export function filterEvents(events: FilterEvent[], value: string): FilterEvent[] {
  const filterValue = value.toLowerCase();
  return events.filter((event) => event.type.toLowerCase().includes(filterValue));
}
