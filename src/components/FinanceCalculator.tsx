import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { computeFinance } from '../lib/finance';

const Row = styled.div` display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.75rem; `;
const Input = styled.input` height: 2.5rem; border-radius: 10px; border: 1px solid #d9dde3; padding: 0 0.5rem; `;
const Box = styled.div` border: 1px solid #eef0f2; border-radius: 10px; padding: 0.5rem; background:#fff; `;
const KV = styled.div` display:grid; grid-template-columns: 1fr auto; padding: 0.25rem 0; `;

export default function FinanceCalculator({ price, defaultDepositPct=10, defaultTerm=60, initialQuote }: { price: number; defaultDepositPct?: number; defaultTerm?: number; initialQuote?: ReturnType<typeof computeFinance>; }) {
  const [deposit, setDeposit] = useState(Math.round(price * (defaultDepositPct/100)));
  const [term, setTerm] = useState(defaultTerm);

  const quote = useMemo(() => computeFinance(price, deposit, term), [price, deposit, term]);

  return (
    <div>
      <Row>
        <label>Deposit (£)
          <Input type="number" min={0} max={price} value={deposit} onChange={(e)=> setDeposit(Math.max(0, Math.min(price, Number(e.target.value) || 0)))} />
        </label>
        <label>Term (months)
          <Input type="number" min={12} max={84} value={term} onChange={(e)=> setTerm(Math.max(1, Number(e.target.value) || 1))} />
        </label>
      </Row>
      <Box>
        <KV><span>On the road price</span><strong>£{quote.onTheRoadPrice.toLocaleString()}</strong></KV>
        <KV><span>Total deposit</span><strong>£{quote.totalDeposit.toLocaleString()}</strong></KV>
        <KV><span>Amount of credit</span><strong>£{quote.totalAmountOfCredit.toLocaleString()}</strong></KV>
        <KV><span>Monthly payment</span><strong>£{quote.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong></KV>
        <KV><span>Payments</span><span>{quote.numberOfMonthlyPayments} months</span></KV>
      </Box>
      <p style={{fontSize:'0.9em', color:'#475467'}}>This example excludes interest/APR for simplicity as per the brief.</p>
    </div>
  );
}
