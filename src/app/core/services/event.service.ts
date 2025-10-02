import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterEvent } from '../models/filter-event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  // hardcoded URL for simplicity, instead of an environment variable
  private apiUrl = 'https://br-fe-assignment.github.io/customer-events/events.json';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<{ events: FilterEvent[] }> {
    return this.http.get<{ events: FilterEvent[] }>(this.apiUrl);
  }
}
