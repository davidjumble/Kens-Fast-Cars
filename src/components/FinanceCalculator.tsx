import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { computeFinance } from "../lib/finance";

const Field = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin: 0 20px 0.25rem 20px;
  font-size: 0.95rem;
  font-weight: 500;
`;

const Input = styled.input`
  height: 2.5rem;
  border-radius: 10px;
  border: 1px solid #d9dde3;
  padding: 0 0.5rem;
  margin: 0 20px 0.5rem 20px;
  width: calc(100% - 40px);
`;

const Slider = styled.input<{ $value: number; $min: number; $max: number }>`
  -webkit-appearance: none;
  width: calc(100% - 40px);
  height: 12px;
  border-radius: 6px;
  background: ${({ $value, $min, $max }) => {
    const percent = (($value - $min) / ($max - $min)) * 100;
    return `linear-gradient(to right, red ${percent}%, black ${percent}%)`;
  }};
  outline: none;
  margin: 0 20px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 40px;
    height: 40px;
    background: url("/buttonKFC.png") no-repeat center;
    background-size: contain;
    cursor: pointer;
    border: none;
  }

  &::-moz-range-thumb {
    width: 40px;
    height: 40px;
    background: url("/buttonKFC.png") no-repeat center;
    background-size: contain;
    cursor: pointer;
    border: none;
  }
`;

const Box = styled.div`
  border: 1px solid #eef0f2;
  border-radius: 10px;
  padding: 0.5rem;
  background: #fff;
`;

const KV = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 0.25rem 0;
`;

export default function FinanceCalculator({
  price,
  defaultDepositPct = 10,
  defaultTerm = 60,
  initialQuote,
}: {
  price: number;
  defaultDepositPct?: number;
  defaultTerm?: number;
  initialQuote?: ReturnType<typeof computeFinance>;
}) {
  const [deposit, setDeposit] = useState(
    Math.round(price * (defaultDepositPct / 100))
  );
  const [term, setTerm] = useState(defaultTerm);

  const quote = useMemo(
    () => computeFinance(price, deposit, term),
    [price, deposit, term]
  );

  return (
    <div>
      <Field>
        <Label>Deposit (£)</Label>
        <Input
          type="number"
          min={0}
          max={price}
          value={deposit}
          onChange={(e) =>
            setDeposit(Math.max(0, Math.min(price, Number(e.target.value) || 0)))
          }
        />
        <Slider
          type="range"
          min={0}
          max={price}
          value={deposit}
          onChange={(e) => setDeposit(Number(e.target.value))}
          $value={deposit}
          $min={0}
          $max={price}
        />
      </Field>

      <Field>
        <Label>Term (months)</Label>
        <Input
          type="number"
          min={12}
          max={84}
          value={term}
          onChange={(e) =>
            setTerm(Math.max(12, Math.min(84, Number(e.target.value) || 12)))
          }
        />
        <Slider
          type="range"
          min={12}
          max={84}
          value={term}
          onChange={(e) => setTerm(Number(e.target.value))}
          $value={term}
          $min={12}
          $max={84}
        />
      </Field>

      <Box>
        <KV>
          <span>On the road price</span>
          <strong>£{quote.onTheRoadPrice.toLocaleString()}</strong>
        </KV>
        <KV>
          <span>Total deposit</span>
          <strong>£{quote.totalDeposit.toLocaleString()}</strong>
        </KV>
        <KV>
          <span>Amount of credit</span>
          <strong>£{quote.totalAmountOfCredit.toLocaleString()}</strong>
        </KV>
        <KV>
          <span>Monthly payment</span>
          <strong>
            £
            {quote.monthlyPayment.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </strong>
        </KV>
        <KV>
          <span>Payments</span>
          <span>{quote.numberOfMonthlyPayments} months</span>
        </KV>
      </Box>

      <p style={{ fontSize: "0.9em", color: "#475467" }}>
        This example excludes interest/APR for simplicity as per the brief.
      </p>
    </div>
  );
}
