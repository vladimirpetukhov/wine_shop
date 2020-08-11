import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core/';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { openUploadWidget } from '../../services/cloudinary-service';
import IconButton from '../buttons/IconButton/IconButton';
import InputField from './InputField';
import TextareaField from './TextareaField';

const LayoutProduct = ({
  changeHandlerFactory,
  runControlValidation,
  formState,
  image,
  setImage,
}) => {
  const handleOnChangeName = changeHandlerFactory('name');
  const handleOnChangeYear = changeHandlerFactory('year');
  const handleOnChangeType = changeHandlerFactory('type');
  const handleOnChangeAlcohol = changeHandlerFactory('alcohol');
  const handleOnChangeSize = changeHandlerFactory('size');
  const handleOnChangePrice = changeHandlerFactory('price');
  const handleOnChangeDescription = changeHandlerFactory('description');
  const handleOnChangeQuantity = changeHandlerFactory('quantity');

  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: 'dfyamkucg',
      tags: [tag, 'anImage'],
      uploadPreset: 'upload',
    };
    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        // console.log(photos);
        if (photos.event === 'success') {
          // setImages([...images, photos.info.public_id]);
          setImage(photos.info.public_id);
        }
      } else {
        // console.log(error);
      }
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <InputField
          label={'Наименование'}
          name={'name'}
          changeHandler={handleOnChangeName}
          runControlValidation={runControlValidation}
          formState={formState}
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          label={'Реколта'}
          name={'year'}
          changeHandler={handleOnChangeYear}
          runControlValidation={runControlValidation}
          formState={formState}
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          label={'Вид'}
          name={'type'}
          changeHandler={handleOnChangeType}
          runControlValidation={runControlValidation}
          formState={formState}
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          label={'Размер'}
          name={'size'}
          changeHandler={handleOnChangeSize}
          runControlValidation={runControlValidation}
          formState={formState}
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          label={'Алкохол'}
          name={'alcohol'}
          changeHandler={handleOnChangeAlcohol}
          runControlValidation={runControlValidation}
          formState={formState}
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          label={'Цена'}
          name={'price'}
          changeHandler={handleOnChangePrice}
          runControlValidation={runControlValidation}
          formState={formState}
        />
      </Grid>
      <Grid item xs={5}>
        <InputField
          label={'Количество'}
          name={'quantity'}
          changeHandler={handleOnChangeQuantity}
          runControlValidation={runControlValidation}
          formState={formState}
        />
      </Grid>
      <Grid item xs={7}>
        <label htmlFor="icon-button-file">
          Прикачи снимка
          <IconButton
            attr={{
              color: 'primary',
              'aria-label': 'upload picture',
              component: 'span',
            }}
            handler={() => beginUpload('image')}
            icon="camera"
          />
        </label>
        {image ? <CheckCircleIcon htmlColor={'green'} /> : null}
      </Grid>
      <Grid item xs={12}>
        <TextareaField
          cols={45}
          rows={10}
          label={'Описание'}
          name={'description'}
          handleChange={handleOnChangeDescription}
          formState={formState}
          runControlValidation={runControlValidation}
        />
      </Grid>
    </Grid>
  );
};

LayoutProduct.propTypes = {
  changeHandlerFactory: PropTypes.func,
  formState: PropTypes.object,
  runValidations: PropTypes.func,
  runControlValidation: PropTypes.func,
  formIsInvalid: PropTypes.func,
  history: PropTypes.object,
  image: PropTypes.string,
  setImage: PropTypes.func,
};

export default LayoutProduct;
