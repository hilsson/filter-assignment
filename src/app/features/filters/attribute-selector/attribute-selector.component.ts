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
      ? this.filterOperatorsByType(['in between', 'greater than', 'less than', 'equals'])
      : this.filterOperatorsByType(['equals', 'does not equal', 'contains', 'does not contain']);
  }

  filterOperatorsByType(operatorsArray: string[]): string[] {
    return this.operators.filter((operator) => operatorsArray.includes(operator));
  }
}
