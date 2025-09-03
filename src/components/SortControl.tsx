import React from 'react';
import styled from 'styled-components';
import { SortState } from '../store/vehiclesSlice';

const Select = styled.select` height: 2.75rem; border-radius: 10px; border:1px solid #d9dde3; padding: 0 0.5rem; `;

export default function SortControl({ sort, onChange }: { sort: SortState; onChange: (s: SortState) => void; }) {
  return (
    <label>
      <span className="sr-only">Sort</span>
      <Select
        value={`${sort.field}:${sort.direction}`}
        onChange={(e) => {
          const [field, direction] = e.target.value.split(':') as ['price'|'year'|'mileage','asc'|'desc'];
          onChange({ field, direction });
        }}
      >
        <option value="price:asc">Price (low → high)</option>
        <option value="price:desc">Price (high → low)</option>
        <option value="year:desc">Year (newest)</option>
        <option value="year:asc">Year (oldest)</option>
        <option value="mileage:asc">Mileage (low)</option>
        <option value="mileage:desc">Mileage (high)</option>
      </Select>
    </label>
  );
}
