import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form` display: grid; grid-template-columns: 1fr auto; gap: 0.5rem; flex: 1; `;
const Input = styled.input` height: 2.75rem; padding: 0 0.75rem; border-radius: 10px; border: 1px solid #d9dde3; `;
const Btn = styled.button` height: 2.75rem; padding: 0 1rem; border-radius: 10px; border: 1px solid #0b1220; background: #0b1220; color:#fff; font-weight:600; `;

export default function SearchBar({ initialQuery = '', onSearch }: { initialQuery?: string; onSearch: (q: string) => void; }) {
  const [q, setQ] = useState(initialQuery);
  return (
    <Form onSubmit={(e)=>{ e.preventDefault(); onSearch(q.trim()); }} role="search">
      <Input placeholder="Search make or model…" value={q} onChange={(e)=>setQ(e.target.value)} />
      <Btn type="submit">Search</Btn>
    </Form>
  );
}
