import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../src/store';
import { fetchVehicles, setPage, setSort } from '../src/store/vehiclesSlice';
import { fetchFilters, setAppliedFilters, AppliedFilters } from '../src/store/filtersSlice';
import SearchBar from '../src/components/SearchBar';
import FilterBar from '../src/components/FilterBar/FilterBar';
import VehicleGrid from '../src/components/VehicleGrid/VehicleGrid';
import SortControl from '../src/components/SortControl';
import Pagination from '../src/components/Pagination';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Wrap = styled.main` max-width: 1200px; margin: 1rem auto; padding: 0 1rem; `;
const Row = styled.div` display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 0.75rem; `;

export default function VehicleSearchPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { vehicles, loadingVehicles, errorVehicles, currentPage, totalPages, sort } = useSelector((s: RootState) => s.vehicles);
  const { filters, appliedFilters, loadingFilters } = useSelector((s: RootState) => s.filters);

  // Initialize from query params
  useEffect(() => {
    const q = router.query;
    const nextApplied: AppliedFilters = {
      query: typeof q.query === 'string' ? q.query : undefined,
      make: typeof q.make === 'string' ? q.make : undefined,
      model: typeof q.model === 'string' ? q.model : undefined,
      year: q.year ? Number(q.year) : undefined
    };
    dispatch(setAppliedFilters(nextApplied));
    dispatch(fetchVehicles());
    dispatch(fetchFilters());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  // Re-fetch when filters/page/sort change
  useEffect(() => {
    dispatch(fetchVehicles());
    dispatch(fetchFilters());
  }, [dispatch, appliedFilters, currentPage, sort]);

  return (
    <Wrap>
      <Row>
        <SearchBar
          initialQuery={appliedFilters.query || ''}
          onSearch={(q) => dispatch(setAppliedFilters({ ...appliedFilters, query: q || undefined }))}
        />
        <SortControl sort={sort} onChange={(s) => dispatch(setSort(s))} />
      </Row>
      <FilterBar
        filters={filters}
        applied={appliedFilters}
        loading={loadingFilters}
        onApply={(next) => dispatch(setAppliedFilters(next))}
      />
      <VehicleGrid
        vehicles={vehicles}
        loading={loadingVehicles}
        error={errorVehicles}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => dispatch(setPage(p))}
      />
    </Wrap>
  );
}
