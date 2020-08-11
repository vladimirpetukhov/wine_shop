import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
import { StoreContext } from '../../../store/store';
import AuthorizedActions from './AuthorizedActions';
import UnauthorizedActions from './UnauthorizedActions';

const useStyles = makeStyles((theme) => {
  return {
    row: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardInfo: {
      border: `solid 1px ${theme.palette.primary.text}`,
      borderRadius: '20px',
    },
  };
});
const Bottom = ({ product }) => {
  const classes = useStyles();
  const { state } = useContext(StoreContext);

  return (
    <Card className={classes.cardInfo}>
      <CardContent>
        <div className={classes.row}>
          <h3>Реколта</h3>
          <span>{product.year}</span>
        </div>
        <div className={classes.row}>
          <h3>Цена</h3>
          <span>{product.price}лв</span>
        </div>
      </CardContent>
      {state.isAuth ? (
        <AuthorizedActions product={product} />
      ) : (
        <UnauthorizedActions product={product} />
      )}
    </Card>
  );
};

Bottom.propTypes = {
  product: PropTypes.object,
};

export default Bottom;
