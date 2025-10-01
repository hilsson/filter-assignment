import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeSelector } from './attribute-selector.component';

describe('AttributeSelector', () => {
  let component: AttributeSelector;
  let fixture: ComponentFixture<AttributeSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(AttributeSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
