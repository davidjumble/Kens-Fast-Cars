// src/components/LogoHeader.tsx
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const LogoImg = styled(Image)`
  height: 50px;
  width: auto;
`;

export default function LogoHeader() {
  return (
    <HeaderRow>
      <LogoImg src="/KensCars.png" alt="Kens Cars" height={50} width={150} />
      <LogoImg src="/KFClogo.png" alt="KFC Logo" height={50} width={150} />
    </HeaderRow>
  );
}
