import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const SubmitButton = ({ title, disabled, onClick }) => {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

SubmitButton.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool
}

export default SubmitButton;
