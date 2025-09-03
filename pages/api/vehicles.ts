import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../data/vehicles.json';

type Vehicle = typeof data[number];

function applyFilters(list: Vehicle[], q: NextApiRequest['query']) {
  let out = [...list];
  const query = typeof q.query === 'string' ? q.query.toLowerCase() : undefined;
  const make = typeof q.make === 'string' ? q.make.toLowerCase() : undefined;
  const model = typeof q.model === 'string' ? q.model.toLowerCase() : undefined;
  const year = q.year ? Number(q.year) : undefined;
  const colour = typeof q.colour === 'string' ? q.colour.toLowerCase() : undefined;

  if (query) out = out.filter(v => `${v.make} ${v.model}`.toLowerCase().includes(query));
  if (make) out = out.filter(v => v.make.toLowerCase() === make);
  if (model) out = out.filter(v => v.model.toLowerCase() === model);
  if (year) out = out.filter(v => v.year === year);
  if (colour) out = out.filter(v => (v.colour || '').toLowerCase() === colour);

  return out;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = Number(req.query.page || 1);
  const pageSize = Number(req.query.pageSize || 20);
  const sort = typeof req.query.sort === 'string' ? req.query.sort : 'price:asc';
  const [field, direction] = sort.split(':') as ['price'|'year'|'mileage', 'asc'|'desc'];

  let list = applyFilters(data as any, req.query);

  // sort
  list.sort((a: any, b: any) => {
    const va = a[field]; const vb = b[field];
    return direction === 'asc' ? (va - vb) : (vb - va);
  });

  const totalCount = list.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const start = (page - 1) * pageSize;
  const vehicles = list.slice(start, start + pageSize);

  // simulate latency
  setTimeout(() => {
    res.status(200).json({ vehicles, currentPage: page, totalPages, pageSize, totalCount });
  }, 300);
}
