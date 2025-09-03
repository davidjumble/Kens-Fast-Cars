import { computeFinance } from '../src/lib/finance';

test('computeFinance basic math', () => {
  const q = computeFinance(20000, 2000, 60);
  expect(q.onTheRoadPrice).toBe(20000);
  expect(q.totalDeposit).toBe(2000);
  expect(q.totalAmountOfCredit).toBe(18000);
  expect(q.numberOfMonthlyPayments).toBe(60);
  expect(q.monthlyPayment).toBeCloseTo(300);
});
