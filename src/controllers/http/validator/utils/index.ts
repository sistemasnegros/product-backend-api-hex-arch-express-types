import validator from 'validator';

function isRequired(field: string, data: any, errors: any, label = field): any {
  if (validator.isEmpty(`${data[field]}`)) {
    errors[label] = 'Field Required.';
  }
  return errors;
}

function isNumber(
  field: string,
  data: any,
  errors: any,
  labelError = 'This field must be number.',
  label = field,
): any {
  const dataField = data[field];
  if (dataField !== '' && !parseInt(dataField)) {
    errors[label] = labelError;
  }
  return errors;
}
export { isRequired, isNumber };
