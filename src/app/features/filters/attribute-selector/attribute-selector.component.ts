import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterEvent } from '../../../core/models/filter-event.model';
import { filterOperatorsByType } from '../../../core/utils/filter-event.utils';
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

  get selectedAttribute(): { property: string; type: string } | null {
    const selected = this.parentForm.get('attribute')?.value;
    return this.event.properties?.find((prop) => prop.property === selected) ?? null;
  }

  get inputType(): string {
    if (this.selectedAttribute?.type === 'number') {
      return 'number';
    }

    return 'text';
  }

  get filteredOperators(): string[] {
    return this.inputType === 'number'
      ? filterOperatorsByType(this.operators, ['in between', 'greater than', 'less than', 'equals'])
      : filterOperatorsByType(this.operators, [
          'equals',
          'does not equal',
          'contains',
          'does not contain',
        ]);
  }
}
