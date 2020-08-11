import React, { Fragment } from 'react';
import {Toolbar, Typography, Link} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';


const useStyles = makeStyles((theme) =>
  createStyles({
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
      backgroundColor: theme.palette.primary,
      color: theme.palette.primary.text,
    },
    grow: {
      flexGrow: 1,
    },
    copyright: {
      margin: 'auto',
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
  })
);

const Footer = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <div className={classes.copyright}>
          <Toolbar>
            <Typography variant="body2" align="center">
              {'Copyright © '}
              <Link className={classes.link} href="#">
                Your Website
              </Link>{' '}
              {new Date().getFullYear()}
            </Typography>
          </Toolbar>
        </div>
      </AppBar>
    </Fragment>
  );
};

export default Footer;
