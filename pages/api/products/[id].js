import {getById} from '../../../lib/repository';

export default async function handler(req, res) {
  const p = await getById(req.query.id);
  
  res.status(200).json(p);
}
  