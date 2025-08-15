import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MemStorage } from '../server/storage';
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'GET') {
    const storage = new MemStorage();
    const products = await storage.getProducts();
    return res.status(200).json(products);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
