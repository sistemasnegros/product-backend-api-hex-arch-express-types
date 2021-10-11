import { isEmpty } from '../../../../utils';
import { isRequired, isNumber } from '../utils';

const validateInput = (data: any): any => {
  const errors = {};

  isRequired('name', data, errors);
  isRequired('price', data, errors);
  isNumber('price', data, errors);
  isRequired('image', data, errors);

  const isValid = isEmpty(errors);
  return {
    errors,
    isValid,
  };
};

export default validateInput;
