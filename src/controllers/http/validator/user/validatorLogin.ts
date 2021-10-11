import { isEmpty } from '../../../../utils';
import { isRequired } from '../utils';

const validateInput = (data: any): any => {
  const errors = {};

  isRequired('username', data, errors);
  isRequired('password', data, errors);

  const isValid = isEmpty(errors);
  return {
    errors,
    isValid,
  };
};

export default validateInput;
