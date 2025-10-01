export interface FilterEvent {
  type: string;
  properties: PropertyEvent[];
}

export interface PropertyEvent {
  type: string;
  property: string;
}
