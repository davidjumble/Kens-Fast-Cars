import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../data/vehicles.json';

type Vehicle = typeof data[number];

function applyFilters(list: Vehicle[], q: NextApiRequest['query']) {
  let out = [...list];
  const query = typeof q.query === 'string' ? q.query.toLowerCase() : undefined;
  const make = typeof q.make === 'string' ? q.make.toLowerCase() : undefined;
  const model = typeof q.model === 'string' ? q.model.toLowerCase() : undefined;
  const year = q.year ? Number(q.year) : undefined;


  if (query) out = out.filter(v => `${v.make} ${v.model}`.toLowerCase().includes(query));
  if (make) out = out.filter(v => v.make.toLowerCase() === make);
  if (model) out = out.filter(v => v.model.toLowerCase() === model);
  if (year) out = out.filter(v => v.year === year);

  return out;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const list = applyFilters(data as any, req.query);

  const by = <K extends keyof Vehicle>(key: K) => {
    const map = new Map<any, number>();
    for (const v of list) {
      const k = v[key] as any;
      map.set(k, (map.get(k) || 0) + 1);
    }
    return Array.from(map.entries()).map(([value, count]) => ({ value, count }));
  };

  // simulate latency
  setTimeout(()=>{
    res.status(200).json({
      make: by('make'),
      model: by('model'),
      year: by('year'),
    });
  }, 300);
}
