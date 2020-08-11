import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CardTop from './Top';
import CardBottom from './Bottom';

const ProductCard = ({ product }) => {

  return (
    <Fragment>
      <CardTop product={product} />
      <CardBottom product={product} />
    </Fragment>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
