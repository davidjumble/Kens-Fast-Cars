import reducer, { FETCH_VEHICLES_REQUEST, FETCH_VEHICLES_SUCCESS, FETCH_VEHICLES_FAILURE } from '../src/store/vehiclesSlice';

test('vehicles loading flags', () => {
  const state = reducer(undefined, { type: 'init' } as any);
  const loading = reducer(state, FETCH_VEHICLES_REQUEST());
  expect(loading.loadingVehicles).toBe(true);
  const success = reducer(loading, FETCH_VEHICLES_SUCCESS({ vehicles: [], currentPage: 1, totalPages: 1, pageSize: 20 }));
  expect(success.loadingVehicles).toBe(false);
  const failed = reducer(loading, FETCH_VEHICLES_FAILURE('bad'));
  expect(failed.errorVehicles).toBe('bad');
});
