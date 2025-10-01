import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterEvent } from '../../../core/models/filter-event.model';
import { FiltersMaterialModule } from '../filters.module';

@Component({
  selector: 'app-attribute-selector',
  imports: [CommonModule, ReactiveFormsModule, FiltersMaterialModule],
  templateUrl: './attribute-selector.component.html',
  styleUrl: './attribute-selector.component.scss',
})
export class AttributeSelector {
  @Input({ required: true }) parentForm: FormGroup = new FormGroup({});
  @Input({ required: true }) event: FilterEvent = { type: '', properties: [] };
  @Input({ required: true }) operators: string[] = [];

  get selectedAttribute(): string {
    return this.parentForm.get('attribute')?.value ?? null;
  }
}
