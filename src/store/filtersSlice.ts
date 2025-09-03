import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '.';

export type Option = { value: string | number; count?: number };
export type FilterMetadata = { make: Option[]; model: Option[]; year: Option[];  };
export type AppliedFilters = { query?: string; make?: string; model?: string; year?: number; };

type FiltersState = {
  filters: FilterMetadata;
  appliedFilters: AppliedFilters;
  loadingFilters: boolean;
  errorFilters: string | null;
};

const initialState: FiltersState = {
  filters: { make: [], model: [], year: []},
  appliedFilters: {},
  loadingFilters: false,
  errorFilters: null
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    FETCH_FILTERS_REQUEST(state){ state.loadingFilters = true; state.errorFilters = null; },
    FETCH_FILTERS_SUCCESS(state, action: PayloadAction<FilterMetadata>){ state.loadingFilters = false; state.filters = action.payload; },
    FETCH_FILTERS_FAILURE(state, action: PayloadAction<string>){ state.loadingFilters = false; state.errorFilters = action.payload; },
    SET_FILTERS(state, action: PayloadAction<AppliedFilters>){ state.appliedFilters = action.payload; }
  }
});

export const { FETCH_FILTERS_REQUEST, FETCH_FILTERS_SUCCESS, FETCH_FILTERS_FAILURE, SET_FILTERS } = slice.actions;
export default slice.reducer;

export const setAppliedFilters = (next: AppliedFilters) => SET_FILTERS(next);

export const fetchFilters = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { filters: { appliedFilters } } = getState();
  const params = new URLSearchParams();
  if (appliedFilters.query) params.set('query', appliedFilters.query);
  if (appliedFilters.make) params.set('make', appliedFilters.make);
  if (appliedFilters.model) params.set('model', appliedFilters.model);
  if (appliedFilters.year) params.set('year', String(appliedFilters.year));

  dispatch(FETCH_FILTERS_REQUEST());
  try {
    const res = await fetch(`/api/vehicle-filters?${params.toString()}`);
    if (!res.ok) throw new Error(`Failed (${res.status})`);
    const data = await res.json();
    dispatch(FETCH_FILTERS_SUCCESS(data));
  } catch (e: any) {
    dispatch(FETCH_FILTERS_FAILURE(e.message || 'Failed to fetch filters'));
  }
};
