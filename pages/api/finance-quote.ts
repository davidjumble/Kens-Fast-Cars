import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { price, deposit, term } = req.body || {};
  const onTheRoadPrice = Math.max(0, Math.round(Number(price)||0));
  const totalDeposit = Math.max(0, Math.min(onTheRoadPrice, Math.round(Number(deposit)||0)));
  const numberOfMonthlyPayments = Math.max(1, Math.round(Number(term)||1));
  const totalAmountOfCredit = onTheRoadPrice - totalDeposit;
  const monthlyPayment = totalAmountOfCredit / numberOfMonthlyPayments;
  setTimeout(()=>{
    res.status(200).json({ onTheRoadPrice, totalDeposit, totalAmountOfCredit, numberOfMonthlyPayments, monthlyPayment });
  }, 150);
}
