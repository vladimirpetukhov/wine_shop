import React, { Fragment } from 'react';
import { Grid, Container } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  img: {
    height: '90vh',
  },
  header: {
    fontSize: '40px',
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: '28px',
    color: theme.palette.primary.text,
  },
  container: {
    padding: '200px',
  },
  signature: {
    marginTop: '50px',
  },
  bottomImg: {
    width: '100vw',
  },
  bottomContent: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '28px',
  },
  bottomContainer: {
    position: 'relative',
    textAlign: 'center',
  },
}));

const Welcome = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <img src="/home-background.jpg" className={classes.img} alt='img' />
        </Grid>
        <Grid container justify="center" alignItems="center" item xs={7}>
          <Container fixed className={classes.container}>
            <p className={classes.subheader}>Руевит Естайт</p>
            <p className={classes.header}>
              Гроздето и виното са част от живота в нашето семейство.
            </p>
            <p className={classes.content}>
              РУЕВИТ ЕСТЕЙТ Хубавите вина започват с най-добрите плодове. Затова
              вече трето поколение участваме в отглеждането и обработването на
              реколтата. Наблюдаваме отблизо всяка една стъпка, за да
              гарантираме и поддържаме възможно най – високото качество. Ние
              правим вината такива, каквито ги обичаме, за да може да усетите и
              вие, нашите приятели, вкуса на истинското вино.
            </p>
            <img src="/black-signature.png" className={classes.signature} alt='img' />
          </Container>
        </Grid>
        <Grid container item xs={12} className={classes.bottomContainer}>
          <img src="/wine-yard.jpg" className={classes.bottomImg} alt='img' />
          <div className={classes.bottomContent}>
            <p className={classes.subheader}>ЛОЗЯ</p>
            <p className={classes.header}>Локация</p>
            <p className={classes.content}>
              ЛОЗЯ Локация Нашите лозови насаждения се намират в землището на
              гр. Бяла черква, област Велико Търново. Територията е известна от
              дълги години с традициите си в отглеждането на грозде.
            </p>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Welcome;
