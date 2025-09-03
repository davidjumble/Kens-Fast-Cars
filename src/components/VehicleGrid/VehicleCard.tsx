import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  colour?: string;
  imageUrl?: string;
};

const Card = styled.article`
  border: 1px solid #eef0f2;
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Thumb = styled.div<{ $src: string }>`
  position: relative;
  background: url(${({ $src }) => $src}) center/cover no-repeat;
  aspect-ratio: 16/10;
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

const Body = styled.div`
  padding: 0.75rem 0.9rem 1rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 0.15rem 0;
  color: #344054;
`;

const CTA = styled.a`
  display: inline-flex;
  justify-content: flex-end;
  margin-top: 0.75rem;
  color: #0b1220;
  font-weight: 600;
`;

export default function VehicleCard({ v }: { v: Vehicle }) {
  const [imgSrc, setImgSrc] = useState(v.imageUrl || '/sadKFC.png');
  const [isFallback, setIsFallback] = useState(!v.imageUrl);

  useEffect(() => {
    if (!v.imageUrl) return;

    const testImg = new Image();
    testImg.src = v.imageUrl;

    testImg.onload = () => {
      setImgSrc(v.imageUrl!);
      setIsFallback(false);
    };

    testImg.onerror = () => {
      setImgSrc('/sadKFC.png');
      setIsFallback(true);
    };
  }, [v.imageUrl]);

  return (
    <Card>
      <Thumb $src={imgSrc}>
        {isFallback && <NoImageLabel>No image</NoImageLabel>}
      </Thumb>
      <Body>
        <h3 style={{ margin: '0 0 0.25rem' }}>
          {v.year} {v.make} {v.model}
        </h3>
        <Row>
          <span>Price</span>
          <strong>£{v.price.toLocaleString()}</strong>
        </Row>
        <Row>
          <span>Mileage</span>
          <span>{v.mileage.toLocaleString()} mi</span>
        </Row>
        <Row>
          <span>Colour</span>
          <span>{v.colour || '—'}</span>
        </Row>
        <Link
          href={{
            pathname: `/vehicle/${encodeURIComponent(v.make)}/${encodeURIComponent(v.model)}`,
            query: { id: v.id },
          }}
          passHref
        >
          <CTA>View details →</CTA>
        </Link>
      </Body>
    </Card>
  );
}
