import { FilterEvent } from '../models/filter-event.model';

export function filterEvents(events: FilterEvent[], value: string): FilterEvent[] {
  const filterValue = value.toLowerCase();
  return events.filter((event) => event.type.toLowerCase().includes(filterValue));
}

export const OPERATORS = [
  'equals',
  'does not equal',
  'contains',
  'does not contain',
  'equal to',
  'in between',
  'greater than',
  'less than',
];
