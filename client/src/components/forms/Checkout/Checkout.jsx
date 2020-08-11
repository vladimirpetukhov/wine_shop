import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import {
  CssBaseline,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withForm from '../../../hocs/withForm';
import { StoreContext } from '../../../store/store';
import { resetCartSuccess } from '../../../store/actions';
import InputField from '../InputField';
import SubmitButton from '../../buttons/SubmitButton/SubmitButton';
import productService from '../../../services/product-service';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: `solid 1px ${theme.palette.primary.text}`,
    padding: '20px',
    borderRadius: '20px',
    boxShadow: `3px 3px 5px ${theme.palette.primary.text}`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.text,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
}));

const Checkout = ({
  changeHandlerFactory,
  formState,
  runValidations,
  runControlValidation,
  formIsInvalid,
  history,
}) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(StoreContext);
  const handleOnChangeName = changeHandlerFactory('name');
  const handleOnChangeTown = changeHandlerFactory('town');
  const handleOnChangeAddress = changeHandlerFactory('address');
  const handleOnChangeEmail = changeHandlerFactory('email');

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      runValidations().then((formData) => {
        productService.checkoutOrder(state.cart, formData).then(() => {
          dispatch(resetCartSuccess())
          history.push('/thankyou');
        })
      });
    },
    [history, dispatch, runValidations, state.cart]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Данни за поръчка
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField
                label={'Име'}
                name={'name'}
                changeHandler={handleOnChangeName}
                runControlValidation={runControlValidation}
                formState={formState}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                label={'Email адрес'}
                name={'email'}
                changeHandler={handleOnChangeEmail}
                runControlValidation={runControlValidation}
                formState={formState}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                label={'Град'}
                name={'town'}
                changeHandler={handleOnChangeTown}
                runControlValidation={runControlValidation}
                formState={formState}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                label={'Адрес'}
                name={'address'}
                changeHandler={handleOnChangeAddress}
                runControlValidation={runControlValidation}
                formState={formState}
              />
            </Grid>
          </Grid>
          <SubmitButton
            disabled={formIsInvalid()}
            title={'Поръчай'}
          />
        </form>
      </div>
    </Container>
  );
};

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Must be valid email')
    .required('Email is required'),
  town: yup.string().required('Town is required'),
  address: yup.string().required('Address is required'),
});

const initialState = {
  name: '',
  email: '',
  town: '',
  address: '',
};

Checkout.propTypes = {
  changeHandlerFactory: PropTypes.func,
  formState: PropTypes.object,
  runValidations: PropTypes.func,
  runControlValidation: PropTypes.func,
  formIsInvalid: PropTypes.func,
  history: PropTypes.object,
};

export default withForm(Checkout, initialState, schema);
