import {allIds} from '../../lib/repository';

export default async function handler(req, res) {
  const produtos = await allIds();
  let limit = req.query.limit != null ? req.query.limit : 100; 
  
  res.status(200).json(produtos.slice(0, limit));
}
  