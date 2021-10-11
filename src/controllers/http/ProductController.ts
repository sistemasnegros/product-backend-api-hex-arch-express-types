import express from 'express';

import { productInteractor } from '../../core/interactors';
import { Response, Request } from 'express';
import ProductSearch from '../../core/entities/product/ProductSearch';
import { buildSearch } from './utils';
import auth from './middlewares/auth';
import { isEmpty } from '../../utils';
import validatorProduct from './validator/product';

const router = express.Router();

//getById
router.get('/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productModel = await productInteractor.getById(parseInt(id));
    res.json(productModel);
  } catch (e) {
    console.log(e);
    res.status(404).json({ errors: e.message });
  }
});

//update
router.put('/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { errors } = validatorProduct(req.body);

  if (isEmpty(errors)) {
    try {
      const productModel = await productInteractor.update(
        parseInt(id),
        req.body,
      );
      res.json(productModel);
    } catch (e) {
      console.log(e);
      res.status(404).json({ errors: e.message });
    }
  } else {
    res.status(401).json(errors);
  }
});

// search
router.get('/', auth, async (req: Request, res: Response) => {
  const { id, name, detail, sort, limit, offset, page } = req.query;

  const productsearch: ProductSearch = Object.assign(
    {
      id: typeof id === 'string' ? parseInt(id) : undefined,
      detail: typeof detail === 'string' ? String(detail) : undefined,
      name: typeof name === 'string' ? String(name) : undefined,
    },
    buildSearch(sort, limit, offset, page),
  );

  try {
    const productModel = await productInteractor.search(productsearch);
    res.json(productModel);
  } catch (e) {
    console.log(e);
    res.status(404).json({ errors: e.message });
  }
});

// create
router.post('/', auth, async (req: Request, res: Response) => {
  const { errors } = validatorProduct(req.body);
  if (isEmpty(errors)) {
    try {
      const productModel = await productInteractor.create(req.body);

      res.status(201).json(productModel);
    } catch (e) {
      console.log(e);
      res.status(404).json({ errors: e.message });
    }
  } else {
    res.status(401).json(errors);
  }
});

// delete
router.delete('/:id', auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await productInteractor.delete(parseInt(id));
    res.status(204).json({});
  } catch (e) {
    console.log(e);
    res.status(404).json({ errors: e.message });
  }
});

export default router;
