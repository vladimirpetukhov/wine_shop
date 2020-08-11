import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  loader: {
    margin: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      <CircularProgress color="primary" size={150} />
    </div>
  );
};

export default Loader;
