import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core/';
import { addToCart } from '../../../store/actions';
import productService from '../../../services/product-service';
import Quantity from '../../Cart/Quantity';
import SubmitButton from '../../buttons/SubmitButton/SubmitButton';
import TableDetails from './TableDetails';
import Loader from '../../common/Loader/Loader';
import { StoreContext } from '../../../store/store';

const useStyles = makeStyles((theme) => {
  return {
    header: {
      fontSize: '40px',
      fontWeight: 'bold',
    },
    subheader: {
      fontSize: '28px',
      color: theme.palette.primary.text,
    },
    container: {
      padding: '50px',
      paddingBottom: '400px',
      paddingTop: '100px',
    },
    price: {
      fontSize: '45px',
    },
    btnSubmit: {
      display: 'inline-block',
      marginLeft: '20px',
      width: '100px',
    },
  };
});

const Details = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(StoreContext);
  const params = useParams();
  const [product, setProduct] = useState();
  const [count, setCount] = useState(1);

  useEffect(() => {
    const { id: productId } = params;
    productService.getProductById(productId).then(({ data }) => {
      setProduct(data[0]);
    });
  }, [params]);

  const addToCartHandler = useCallback(
    (product, count) => {
        dispatch(addToCart(product, count));
    },
    [dispatch]
  );

  if (!product) {
    return <Loader />;
  }

  return (
    <CloudinaryContext cloudName="dfyamkucg">
      <Grid container justify="center" >
        <Grid item xs={5}>
          <Image
            publicId={product.imageUrl}
            fetch-format="auto"
            quality="auto"
            height="600"
            width="600"
            loading="lazy"
          />
        </Grid>
        <Grid item xs={7}>
          <Container fixed className={classes.container}>
            <p className={classes.subheader}>{product.year}</p>
            <p className={classes.header}>{product.name}</p>
            <p className={classes.content}>{product.description}</p>
            <p className={classes.price}>{product.price}лв.</p>
            <Quantity product={product} count={count} setCount={setCount} />
            <div className={classes.btnSubmit}>
              <SubmitButton title={'Купи'} onClick={() => addToCartHandler(product, count)} />
            </div>
            <TableDetails product={product}/>
          </Container>
        </Grid>
      </Grid>
    </CloudinaryContext>
  );
};

export default Details;
