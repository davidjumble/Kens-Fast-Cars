import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import FinanceCalculator from '../../../src/components/FinanceCalculator';
import Link from 'next/link';
import LogoHeader from '../../../src/components/LogoHeader';

type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  colour?: string;
  imageUrl?: string;
};

type FinanceQuote = {
  onTheRoadPrice: number;
  totalDeposit: number;
  totalAmountOfCredit: number;
  numberOfMonthlyPayments: number;
  monthlyPayment: number;
};

type Props = { vehicle?: Vehicle | null; quote?: FinanceQuote | null; error?: string | null };

const Wrap = styled.main`
  max-width: 1120px;
  margin: 1rem auto;
  padding: 0 1rem;
`;

const ImgWrap = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: #e9eef3;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NoImageLabel = styled.span`
  position: absolute;
  top: 0.4rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  font-size: 0.75rem;
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 980px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const Card = styled.section`
  background: #fff;
  border: 1px solid #eef0f2;
  border-radius: 12px;
  padding: 1rem;
`;

const BackLink = styled(Link)`
  color: black;
  text-decoration: none;
  cursor: pointer;
`;
const KV = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 0.25rem 0;
`;

export default function VehiclePage({ vehicle, quote, error }: Props) {
  const [imgSrc, setImgSrc] = useState(vehicle?.imageUrl || '/sadKFC.png');
  const [isFallback, setIsFallback] = useState(!vehicle?.imageUrl);

  useEffect(() => {
    if (!vehicle?.imageUrl) return;

    const testImg = new Image();
    testImg.src = vehicle.imageUrl;

    testImg.onload = () => {
      setImgSrc(vehicle.imageUrl!);
      setIsFallback(false);
    };

    testImg.onerror = () => {
      setImgSrc('/sadKFC.png');
      setIsFallback(true);
    };
  }, [vehicle?.imageUrl]);

  if (error) return <Wrap><p role="alert">{error}</p></Wrap>;
  if (!vehicle) return <Wrap><p>Vehicle not found.</p></Wrap>;

  return (
    <Wrap>
      <LogoHeader/>
      <BackLink href="/vehicleSearch">← Back to search</BackLink>
      <h1>{vehicle.year} {vehicle.make} {vehicle.model}</h1>
      <Grid>
        <Card>
          <ImgWrap>
            <Img src={imgSrc} alt={`${vehicle.make} ${vehicle.model}`} />
            {isFallback && <NoImageLabel>No image</NoImageLabel>}
          </ImgWrap>
          <div>
            <KV><span>Price</span><strong>£{vehicle.price.toLocaleString()}</strong></KV>
            <KV><span>Mileage</span><span>{vehicle.mileage.toLocaleString()} mi</span></KV>
            <KV><span>Colour</span><span>{vehicle.colour || '—'}</span></KV>
          </div>
        </Card>
        <Card>
          <h2 style={{ marginTop: 0 }}>Finance</h2>
          <FinanceCalculator
            price={vehicle.price}
            defaultDepositPct={10}
            defaultTerm={60}
            initialQuote={quote || undefined}
          />
        </Card>
      </Grid>
    </Wrap>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { id } = ctx.query;
  const proto = (ctx.req.headers['x-forwarded-proto'] as string) || 'http';
  const host = ctx.req.headers.host;
  const baseUrl = `${proto}://${host}`;

  try {
    const vehRes = await fetch(`${baseUrl}/api/vehicle?id=${encodeURIComponent(String(id || ''))}`);
    if (!vehRes.ok) throw new Error(`Vehicle fetch failed ${vehRes.status}`);
    const vehicle = await vehRes.json();

    if (!vehicle) return { props: { vehicle: null, quote: null } };

    const body = {
      price: vehicle.price,
      deposit: Math.round(vehicle.price * 0.1),
      term: 60,
    };
    const quoteRes = await fetch(`${baseUrl}/api/finance-quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const quote = quoteRes.ok ? await quoteRes.json() : null;

    return { props: { vehicle, quote } };
  } catch (e: any) {
    return { props: { vehicle: null, quote: null, error: e.message || 'Failed to load vehicle' } };
  }
};

