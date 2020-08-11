import React from 'react';
import Badge from '@material-ui/core/Badge';
import IconButton from '../buttons/IconButton/IconButton';
import NavLink from '../NavLink/NavLink';

const Basket = (props) => {
  const cart = JSON.parse(window.localStorage.getItem('cart'));
  const basket = (cart || []).reduce(
    (acc, curr) => {
      const count = acc.count + curr.productQuantityCart;
      const price = acc.price + curr.price * curr.productQuantityCart;
      return { count, price };
    },
    { count: 0, price: 0 }
  );

  return (
    <NavLink to={'/cart'}>
      <Badge badgeContent={basket.count} color="secondary">
        <IconButton icon="basket" attr={{ color: 'inherit' }} />
      </Badge>
      <p> - {basket.price.toFixed(2)} лв.</p>
    </NavLink>
  );
};

export default Basket;
