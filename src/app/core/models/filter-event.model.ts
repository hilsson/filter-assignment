import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface FilterEvent {
  type: string;
  properties: PropertyEvent[];
}

export interface PropertyEvent {
  type: string;
  property: string;
}

export interface EventAttributeControls {
  attribute: FormControl<string | null>;
  operator: FormControl<string>;
  value: FormControl<string>;
}

export interface EventGroupControls {
  event: FormControl<FilterEvent | string | null>;
  attributes: FormArray<FormGroup<EventAttributeControls>>;
}
