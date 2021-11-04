// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {allRandom} from '../../lib/repository';

export default async function handler(req, res) {
  const produtos = await allRandom();
  let limit = req.query.limit != null ? req.query.limit : 4; 
  
  res.status(200).json(produtos.slice(0, limit));
}
  