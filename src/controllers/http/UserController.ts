import express from 'express';

import { userInteractor } from '../../core/interactors';
import { Response, Request } from 'express';
import UserSearch from '../../core/entities/user/UserSearch';
import { buildSearch } from './utils';
import validatorLogin from './validator/user/validatorLogin';
import validatorUser from './validator/user/validatorUser';
import { isEmpty } from '../../utils';
import API_URL from '../../const/url';

const router = express.Router();

//getById
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userModel = await userInteractor.getById(parseInt(id));
    res.json(userModel);
  } catch (e) {
    console.log(e);
    res.status(404).json({ errors: e.message });
  }
});

//update
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userModel = await userInteractor.update(parseInt(id), req.body);
    res.json(userModel);
  } catch (e) {
    console.log(e);
    res.status(404).json({ errors: e.message });
  }
});

// search
router.get('/', async (req: Request, res: Response) => {
  const { id, username, sort, limit, offset, page } = req.query;

  const usersearch: UserSearch = Object.assign(
    {
      id: typeof id === 'string' ? parseInt(id) : undefined,
      username: typeof username === 'string' ? String(username) : undefined,
    },
    buildSearch(sort, limit, offset, page),
  );

  try {
    const userModel = await userInteractor.search(usersearch);
    res.json(userModel);
  } catch (e) {
    console.log(e);
    res.status(404).json({ errors: e.message });
  }
});

// create
router.post('/', async (req: Request, res: Response) => {
  const { errors } = validatorUser(req.body);
  if (isEmpty(errors)) {
    try {
      const userModel = await userInteractor.create(req.body);
      res.status(201).json(userModel);
    } catch (e) {
      console.log(e);
      res.status(400).json({ errors: e.message });
    }
  } else {
    res.status(401).json(errors);
  }
});

// delete
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await userInteractor.delete(parseInt(id));
    res.status(204).json({});
  } catch (e) {
    console.log(e);
    res.status(404).json({ errors: e.message });
  }
});

// login
router.post(API_URL.LOGIN, async (req: Request, res: Response) => {
  const { errors } = validatorLogin(req.body);

  if (isEmpty(errors)) {
    const { username, password } = req.body;
    try {
      const token = await userInteractor.login(username, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json(errors);
    }
  } else {
    res.status(401).json(errors);
  }
});

export default router;
