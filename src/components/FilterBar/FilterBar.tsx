import React, { useState } from 'react';
import styled from 'styled-components';
import { FilterMetadata, AppliedFilters } from '../../store/filtersSlice';

const Wrap = styled.div` display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; `;
const Button = styled.button` padding: 0.5rem 0.75rem; border-radius: 10px; border: 1px solid #d9dde3; background:#fff; `;
const Menu = styled.div` position: absolute; background: #fff; border: 1px solid #d9dde3; border-radius: 10px; padding: 0.5rem; z-index: 10; min-width: 200px; `;
const PWrap = styled.div` position: relative; `;
const Option = styled.button<{ $active?: boolean }>`
  width: 100%; text-align: left; padding: 0.4rem 0.5rem; border-radius: 8px; border: 1px solid transparent;
  background: ${({$active}) => $active ? '#eef6ff' : 'transparent'};
  &:hover { background: #f5f7fa; }
`;
const Badge = styled.span` background:#eef0f2; border-radius:999px; padding:0 0.45rem; margin-left: 0.4rem; font-size: 0.8em; `;

type Props = {
  filters: FilterMetadata;
  applied: AppliedFilters;
  loading?: boolean;
  onApply: (next: AppliedFilters) => void;
};

export default function FilterBar({ filters, applied, loading, onApply }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (k: string) => setOpen(open === k ? null : k);
  const close = () => setOpen(null);

  const entries = [
    { key: 'make', label: 'Make' as const },
    { key: 'model', label: 'Model' as const },
    { key: 'year', label: 'Year' as const },
  ];

  return (
    <Wrap>
      {entries.map(({ key, label }) => (
        <PWrap key={key}>
          <Button type="button" onClick={() => toggle(key)} disabled={loading}>{label}{applied[key as keyof AppliedFilters] ? ' • '+applied[key as keyof AppliedFilters] : ''}</Button>
          {open === key && (
            <Menu role="menu" aria-label={`${label} options`}>
              <Option onClick={()=>{ onApply({ ...applied, [key]: undefined }); close(); }}>Any</Option>
              {(filters[key as keyof FilterMetadata] || []).map(opt => (
                <Option key={String(opt.value)} onClick={()=>{ onApply({ ...applied, [key]: opt.value as any }); close(); }} $active={applied[key as keyof AppliedFilters] === opt.value}>
                  {String(opt.value)} {typeof opt.count === 'number' && <Badge>{opt.count}</Badge>}
                </Option>
              ))}
            </Menu>
          )}
        </PWrap>
      ))}
    </Wrap>
  );
}
