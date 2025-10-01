import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FiltersContainer } from './features/filters/filters-container/filters-container.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FiltersContainer],
  templateUrl: './app.component.html',
})
export class App {
  protected readonly title = signal('filter-assignment');
}
