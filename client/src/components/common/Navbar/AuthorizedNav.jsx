import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { logout } from '../../../store/actions';
import { StoreContext } from '../../../store/store';
import NavLink from '../../NavLink/NavLink';

const useStyles = makeStyles((theme) => ({
  navLink: {
    '& a': {
      color: theme.palette.primary.text,
      padding: '10px',
      fontWeight: 'bold',
      borderRadius: '20px',
      textDecoration: 'none',
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: theme.palette.primary.text,
        color: theme.palette.primary.main,
      },
      '& span.material-icons': {
        marginRight: '10px',
      },
    },
  },
}));
const AuthorizedNav = ({ history }) => {
  const classes = useStyles();
  const { dispatch } = useContext(StoreContext);

  const handlerLogout = () => {
    dispatch(logout());
    history.push('/');
  };
  return (
    <Fragment>
      <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        item
        xs={6}
        spacing={1}
        className={classes.navLink}
      >
        <Grid container item xs={4}>
          <NavLink to={'/'} icon={'home'} title={'Начало'} />
        </Grid>
        <Grid container item xs={4}>
          <NavLink
            to={'/add-product'}
            icon={'add_business'}
            title={'Добави продукт'}
          />
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={5}
        spacing={1}
        className={classes.navLink}
        justify="flex-end"
        alignItems="flex-end"
      >
        <Grid container item xs={4}>
          <NavLink
            to={'/my-products'}
            icon={'account_circle'}
            title={'Моите продукти'}
          />
        </Grid>
        <Grid container item xs={4}>
          <NavLink
            to={'#'}
            icon={'cancel'}
            title={'Излез'}
            handler={handlerLogout}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

AuthorizedNav.propTypes = {
  history: PropTypes.object,
};

export default AuthorizedNav;
