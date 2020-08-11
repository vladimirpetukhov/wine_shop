import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import Context from '../store/store';
import Navbar from '../components/common/Navbar/Navbar';
import Footer from '../components/common/Footer/Footer';
import AppRouter from './AppRouter';
import Toast from '../components/common/Toast/Toast';
import Loader from '../components/common/Loader/Loader';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#121212',
      text: '#B0976D',
    },
  },
});

// const useStyles = makeStyles((theme) => ({
//   app: {
//     backgroundColor: '#F1F1F1',
//   },
// }));

function App() {
  // const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Context>
          <Toast />
          <Navbar />
          <React.Suspense fallback={ <Loader /> }>
            <AppRouter />
          </React.Suspense>
          <Footer />
        </Context>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
