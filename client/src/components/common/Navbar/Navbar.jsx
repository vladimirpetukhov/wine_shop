import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AuthorizedNav from './AuthorizedNav';
import UnauthorizedNav from './UnauthorizedNav';
import { StoreContext } from '../../../store/store';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  logo: {
    height: '80px',
    width: '100px',
    padding: '10px',
  },

  toolbar: {
    color: theme.palette.primary.text,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { state } = useContext(StoreContext);
  const history = useHistory();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid container alignItems="center" item xs={1}>
              <img src="/ruevite.png" className={classes.logo} alt='img'/>
            </Grid>
            {state.isAuth ? (
              <AuthorizedNav history={history} />
            ) : (
              <UnauthorizedNav />
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;