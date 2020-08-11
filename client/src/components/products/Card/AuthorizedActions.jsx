import React, { Fragment, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '../../buttons/IconButton/IconButton';
import EditDialog from '../../forms/EditProduct/EditDialog';
import { useContext } from 'react';
import { StoreContext } from '../../../store/store';
import { deleteProduct } from '../../../store/actions';
const useStyles = makeStyles((theme) => {
  return {
    actionButtons: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  };
});

const AuthorizeActions = ({ product }) => {
  const classes = useStyles();
  const { dispatch } = useContext(StoreContext);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleClickOpen = useCallback(() => {
    history.push(`${history.location.pathname}/${product._id}`);
    setOpen(true);
  }, [history, product._id]);

  const handleClose = useCallback(() => {
    history.goBack();
    setOpen(false);
  }, [history]);

  const handleDelete = useCallback(() => {
    dispatch(deleteProduct(product._id));
    history.push(`/my-products`);
  }, [dispatch, product._id, history]);
  return (
    <Fragment>
      <CardActions className={classes.actionButtons}>
        <IconButton
          handler={handleClickOpen}
          icon="edit"
          attr={{ size: 'small', color: 'inherit' }}
        />
        <IconButton
          handler={handleDelete}
          icon="delete"
          attr={{ size: 'small', color: 'inherit' }}
        />
      </CardActions>

      {open ? (
        <EditDialog handleClose={handleClose} open={open} product={product} />
      ) : null}
    </Fragment>
  );
};

export default AuthorizeActions;
