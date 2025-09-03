import React from 'react';
import styled from 'styled-components';

const Wrap = styled.nav` display:flex; gap:0.5rem; justify-content:center; margin: 1rem 0; `;
const Btn = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 0.75rem; border-radius:10px; border:1px solid #d9dde3; background:#fff; min-width: 40px;
  ${({$active}) => $active ? 'background:#0b1220;color:#fff;border-color:#0b1220;font-weight:700;' : ''}
`;

export default function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (p:number)=>void; }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <Wrap aria-label="Pagination">
      {pages.map(p => (
        <Btn key={p} onClick={() => onPageChange(p)} $active={p===currentPage} aria-current={p===currentPage ? 'page' : undefined}>{p}</Btn>
      ))}
    </Wrap>
  );
}
