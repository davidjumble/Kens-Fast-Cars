import reducer, { SET_FILTERS } from '../src/store/filtersSlice';

test('set applied filters', () => {
  const state = reducer(undefined, { type: 'init' } as any);
  const next = reducer(state, SET_FILTERS({ make: 'Ford' }));
  expect(next.appliedFilters.make).toBe('Ford');
});
