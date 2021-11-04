import {allByName} from '../../../lib/repository';

export default async function handler(req, res) {
  const produtos = await allByName();
  let limit = req.query.limit != null ? req.query.limit : 50; 
  
  res.status(200).json(produtos.slice(0, limit));
}
  