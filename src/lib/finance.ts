export type FinanceQuote = {
  onTheRoadPrice: number;
  totalDeposit: number;
  totalAmountOfCredit: number;
  numberOfMonthlyPayments: number;
  monthlyPayment: number;
};

export function computeFinance(price: number, deposit: number, term: number): FinanceQuote {
  const onTheRoadPrice = Math.max(0, Math.round(price));
  const totalDeposit = Math.max(0, Math.min(onTheRoadPrice, Math.round(deposit)));
  const numberOfMonthlyPayments = Math.max(1, Math.round(term));
  const totalAmountOfCredit = onTheRoadPrice - totalDeposit;
  const monthlyPayment = totalAmountOfCredit / numberOfMonthlyPayments;
  return { onTheRoadPrice, totalDeposit, totalAmountOfCredit, numberOfMonthlyPayments, monthlyPayment };
}
