import React, { useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Typography, Container, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StoreContext } from '../../../store/store';
import { createProduct } from '../../../store/actions';
import SubmitButton from '../../buttons/SubmitButton/SubmitButton';
import LayoutFieldsProduct from '../LayoutFieldsProduct';
import withForm from '../../../hocs/withForm';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: `solid 1px ${theme.palette.primary.text}`,
    padding: '30px',
    borderRadius: '20px',
    boxShadow: `3px 3px 5px ${theme.palette.primary.text}`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const Create = (props) => {
  const { runValidations, formIsInvalid, history } = props;
  const classes = useStyles();
  const [image, setImage] = useState();
  const { dispatch } = useContext(StoreContext);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      runValidations().then((formData) => {
        if (!image) { return; }
        const product = {
          ...formData,
          imageUrl: image,
        };

        dispatch(createProduct(product));
        history.push('/');
      });
    },
    [history, dispatch, runValidations, image]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography component="div" className={classes.paper}>
        <Typography component="h1" variant="h5">
          Добави нов продукт
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <LayoutFieldsProduct {...props} image={image} setImage={setImage} />
          <SubmitButton disabled={formIsInvalid()} title={'Добави'} />
        </form>
      </Typography>
    </Container>
  );
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'Name must be at least 5 characters')
    .required('Product name is required'),
  year: yup.string().required('Year is required'),
  type: yup.string().required('Type name is required'),
  alcohol: yup.string().required('Alcohol name is required'),
  price: yup.string().required('Price is required'),
  size: yup.string().required('Size is required'),
  description: yup.string().required('Description is required'),
  quantity: yup.string().required('Quantity is required'),
});

const initialState = {
  name: '',
  year: '',
  type: '',
  alcohol: '',
  size: '',
  price: '',
  description: '',
  quantity: ''
};

Create.propTypes = {
  changeHandlerFactory: PropTypes.func,
  formState: PropTypes.object,
  runValidations: PropTypes.func,
  runControlValidation: PropTypes.func,
  formIsInvalid: PropTypes.func,
  history: PropTypes.object,
};

export default withForm(Create, initialState, schema);
