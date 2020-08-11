import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea } from '@material-ui/core';
import NavLink from '../../NavLink/NavLink';

const useStyles = makeStyles((theme) => {
  return {
    media: {
      width: 240,
      padding: 15,
    },
    imageCard: {
      marginBottom: 10,
      padding: 0,
      borderRadius: '20px',
    },
    imageActionArea: {
      display: 'flex',
      justifyContent: 'center',
      border: `solid 1px ${theme.palette.primary.text}`,
      borderRadius: '20px',
    },
  };
});
const Top = ({ product }) => {
  const classes = useStyles();
  return (
    <Card className={classes.imageCard}>
      <NavLink to={`details/${product._id}`}>
        <CardActionArea
          className={classes.imageActionArea}>
          <Image
            className={classes.media}
            publicId={product.imageUrl}
            fetch-format="auto"
            quality="auto"
            height="300"
            width="150"
            loading="lazy"
          />
        </CardActionArea>
      </NavLink>
    </Card>
  );
};

Top.propTypes = {
  product: PropTypes.object,
};

export default Top;
