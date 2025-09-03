import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '.';

export type SortState = { field: 'price'|'year'|'mileage'; direction: 'asc'|'desc' };

export type Vehicle = {
  id: string; make: string; model: string; year: number; price: number; mileage: number; colour?: string; imageUrl?: string;
};

type VehiclesState = {
  vehicles: Vehicle[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  sort: SortState;
  loadingVehicles: boolean;
  errorVehicles: string | null;
};

const initialState: VehiclesState = {
  vehicles: [],
  currentPage: 1,
  totalPages: 0,
  pageSize: 20,
  sort: { field: 'price', direction: 'asc' },
  loadingVehicles: false,
  errorVehicles: null
};

const slice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    FETCH_VEHICLES_REQUEST(state){ state.loadingVehicles = true; state.errorVehicles = null; },
    FETCH_VEHICLES_SUCCESS(state, action: PayloadAction<{ vehicles: Vehicle[]; currentPage: number; totalPages: number; pageSize: number; }>) {
      state.loadingVehicles = false;
      state.vehicles = action.payload.vehicles;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.pageSize = action.payload.pageSize;
    },
    FETCH_VEHICLES_FAILURE(state, action: PayloadAction<string>){ state.loadingVehicles = false; state.errorVehicles = action.payload; },
    SET_PAGE(state, action: PayloadAction<number>){ state.currentPage = action.payload; },
    SET_SORT(state, action: PayloadAction<SortState>){ state.sort = action.payload; }
  }
});

export const { FETCH_VEHICLES_REQUEST, FETCH_VEHICLES_SUCCESS, FETCH_VEHICLES_FAILURE, SET_PAGE, SET_SORT } = slice.actions;
export default slice.reducer;

export const setPage = (p: number) => SET_PAGE(p);
export const setSort = (s: SortState) => SET_SORT(s);

export const fetchVehicles = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { filters: { appliedFilters }, vehicles: { currentPage, pageSize, sort } } = getState();
  const params = new URLSearchParams();
  if (appliedFilters.query) params.set('query', appliedFilters.query);
  if (appliedFilters.make) params.set('make', appliedFilters.make);
  if (appliedFilters.model) params.set('model', appliedFilters.model);
  if (appliedFilters.year) params.set('year', String(appliedFilters.year));
  params.set('page', String(currentPage));
  params.set('pageSize', String(pageSize));
  params.set('sort', `${sort.field}:${sort.direction}`);

  dispatch(FETCH_VEHICLES_REQUEST());
  try {
    const res = await fetch(`/api/vehicles?${params.toString()}`);
    if (!res.ok) throw new Error(`Failed (${res.status})`);
    const data = await res.json();
    dispatch(FETCH_VEHICLES_SUCCESS({ vehicles: data.vehicles, currentPage: data.currentPage, totalPages: data.totalPages, pageSize: data.pageSize }));
  } catch (e: any) {
    dispatch(FETCH_VEHICLES_FAILURE(e.message || 'Failed to fetch vehicles'));
  }
};
