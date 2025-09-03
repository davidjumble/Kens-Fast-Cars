import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../data/vehicles.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const v = (data as any).find((x: any) => x.id === id);
  setTimeout(()=>{
    if (!v) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(v);
  }, 200);
}
