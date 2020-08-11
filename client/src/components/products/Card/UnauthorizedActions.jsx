import React, { useCallback, useContext } from 'react';
import { CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavLink from '../../NavLink/NavLink';
import IconButton from '../../buttons/IconButton/IconButton';
import { addToCart } from '../../../store/actions';
import { StoreContext } from '../../../store/store';

const useStyles = makeStyles((theme) => {
  return {
    actionButtons: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  };
});

const UnauthorizeActions = ({ product }) => {
  const classes = useStyles();
  const { dispatch } = useContext(StoreContext);

  const addToCartHandler = useCallback(
    (product) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  return (
    <CardActions className={classes.actionButtons}>
      <IconButton
        attr={{ size: 'small', color: 'primary' }}
        handler={() => addToCartHandler(product)}
        icon="cart"
      >
        Купи
      </IconButton>

      <NavLink to={`details/${product._id}`}>
        <IconButton attr={{ size: 'small', color: 'primary' }} icon="more" />
      </NavLink>
    </CardActions>
  );
};

export default UnauthorizeActions;
