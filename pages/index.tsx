import React from "react";
import styled from "styled-components";
import Link from "next/link";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9; /* optional */
`;

const Container = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-decoration: none;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }
`;

const KensCarsImage = styled.img`
  width: 600px;
  height: auto;

  @media (max-width: 768px) {
    width: 300px;
  }
`;

const KFCLogoImage = styled.img`
  width: 100px;
  height: auto;

  @media (max-width: 768px) {
    width: 60px;
  }
`;

const LogoTitle: React.FC = () => {
  return (
    <PageWrapper>
      <Link href="/vehicleSearch" passHref legacyBehavior>
        <Container>
          <KensCarsImage src="/KensCars.png" alt="Kens Cars" />
          <KFCLogoImage src="/KFClogo.png" alt="KFC Logo" />
        </Container>
      </Link>
    </PageWrapper>
  );
};

export default LogoTitle;
