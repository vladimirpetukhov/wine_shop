import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core/';
import withForm from '../../../hocs/withForm';
import SubmitButton from '../../buttons/SubmitButton/SubmitButton';
import IconButton from '../../buttons/IconButton/IconButton';
import LayoutFieldsProduct from '../LayoutFieldsProduct';
import productService from '../../../services/product-service'
const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  closeIcon: {
    float: 'right',
  },
}));
const EditDialog = (props) => {
  const classes = useStyles();
  const {
    handleClose,
    open,
    formState,
    runValidations,
    formIsInvalid,
    product,
  } = props;
  const [image, setImage] = useState();

  useEffect(() => {
    Object.assign(formState.form, { ...formState.form, ...product });
  }, [product]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      runValidations().then((formData) => {
        const product = {
          ...formData,
          imageUrl: image,
        };

        productService
          .updateProduct(product)
          .then(() => {
            handleClose();
          })
          .catch((error) => {console.log(error)});
      });
    },
    [runValidations, image, handleClose]
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form className={classes.form} onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">
          Редактиране продукт
          <Typography component="div" className={classes.closeIcon}>
            <IconButton handler={handleClose} icon={'close'} />
          </Typography>
        </DialogTitle>
        <DialogContent>
          <CssBaseline />
          <LayoutFieldsProduct {...props} image={image} setImage={setImage} />
        </DialogContent>
        <DialogActions>
          <SubmitButton disabled={formIsInvalid()} title={'Редактиране'} />
        </DialogActions>
      </form>
    </Dialog>
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
});

const initialState = {
  name: '',
  year: '',
  type: '',
  alcohol: '',
  size: '',
  price: '',
  description: '',
};

EditDialog.propTypes = {
  changeHandlerFactory: PropTypes.func,
  formState: PropTypes.object,
  runValidations: PropTypes.func,
  runControlValidation: PropTypes.func,
  formIsInvalid: PropTypes.func,
  history: PropTypes.object,
};

export default withForm(EditDialog, initialState, schema);
