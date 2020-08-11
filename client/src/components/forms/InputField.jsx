import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core/';
const InputField = ({
  label,
  name,
  changeHandler,
  formState,
  runControlValidation,
  type,
}) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name={name}
      label={label}
      id={name}
      type={type === 'password' ? 'password' : 'text'}
      onChange={changeHandler}
      onBlur={runControlValidation(name)}
      error={!!formState.errors && !!formState.errors[name]}
      helperText={formState.errors && formState.errors[name]}
      value={formState.form[name]}
    />
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  changeHandler: PropTypes.func,
  formState: PropTypes.object,
  runControlValidation: PropTypes.func,
  type: PropTypes.string,
};

export default InputField;
