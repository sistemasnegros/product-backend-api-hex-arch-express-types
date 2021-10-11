import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { Response, NextFunction } from 'express';

import { userInteractor } from '../../../core/interactors';
import ERRORS from '../../../const/errors';

dotenv.config();

const { SECRET_KEY } = process.env;

const auth = async (
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authorizationHeader: any =
    req.headers['authorization'] || req.headers['Authorization'];

  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);

    const usermodel = await userInteractor.getById(decoded.id);

    if (usermodel) {
      req.currentUser = usermodel;
      next();
    } else {
      res.status(401).json({ error: ERRORS.INVALID_TOKEN });
    }
  } catch (error) {
    res.status(401).json({ error: ERRORS.TOKEN_NOT_FOUND });
  }
};

export default auth;
