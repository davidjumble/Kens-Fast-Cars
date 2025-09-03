import React from 'react';
import styled from 'styled-components';
import VehicleCard, { Vehicle } from './VehicleCard';

const Grid = styled.div` display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; `;

export default function VehicleGrid({ vehicles, loading, error }: { vehicles: Vehicle[]; loading?: boolean; error?: string | null; }) {
  if (error) return <p role="alert">{error}</p>;
  if (loading) return <p>Loading vehicles…</p>;
  if (!vehicles?.length) return <p>No vehicles match your search.</p>;
  return <Grid>{vehicles.map(v => <VehicleCard key={v.id} v={v} />)}</Grid>;
}
