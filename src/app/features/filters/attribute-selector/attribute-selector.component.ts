import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterEvent } from '../../../core/models/filter-event.model';
import { FiltersMaterialModule } from '../filters.module';

@Component({
  selector: 'app-attribute-selector',
  imports: [CommonModule, ReactiveFormsModule, FiltersMaterialModule],
  templateUrl: './attribute-selector.component.html',
  styleUrl: './attribute-selector.component.scss',
})
export class AttributeSelector implements OnInit {
  @Input({ required: true }) parentForm: FormGroup = new FormGroup({});
  @Input({ required: true }) event: FilterEvent = { type: '', properties: [] };
  @Input({ required: true }) operators: string[] = [];

  ngOnInit(): void {}

  get selectedAttribute(): string {
    return this.parentForm.get('attribute')?.value;
  }
}
