import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { CloudinaryContext } from 'cloudinary-react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow as TableRowMaterial,
  Paper,
  Typography,
} from '@material-ui/core';
import TableRow from './TableRow';
import SubmitButton from '../buttons/SubmitButton/SubmitButton';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    marginTop: 50,
    marginBottom: 150,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '80vw',
  },
  total: {
    fontSize: 24,
    float: 'right',
    fontWeight: 'bold',
  },
}));

const Cart = () => {
  const classes = useStyles();
  const history = useHistory();
  const cart = JSON.parse(window.localStorage.getItem('cart'));
  const totalPrice = (cart || []).reduce((acc, curr) => {
    acc += curr.price * curr.productQuantityCart;
    return acc;
  }, 0);
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      history.push('/checkout');
    },
    [history]
  );
  const renderProducts = (cart || []).map((product) => {
    return <TableRow key={product._id} product={product} />;
  });

  return (
    <CloudinaryContext cloudName="dfyamkucg">
      <TableContainer component={Paper} className={classes.root}>
        <form onSubmit={handleSubmit}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRowMaterial>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="right">Продукт</StyledTableCell>
                <StyledTableCell align="right">Цена</StyledTableCell>
                <StyledTableCell align="right">Количество</StyledTableCell>
                <StyledTableCell align="right">Общо</StyledTableCell>
              </TableRowMaterial>
            </TableHead>
            <TableBody>
              {renderProducts.length ? (
                renderProducts
              ) : (
                <tr>
                  <td>Няма продукти в количката</td>
                </tr>
              )}
            </TableBody>
          </Table>
          <Typography component="div" className={classes.total}>
            Общо {totalPrice.toFixed(2)}лв
          </Typography>
          <SubmitButton
            disabled={!renderProducts.length}
            title={'Приключи поръчката'}
          />
        </form>
      </TableContainer>
    </CloudinaryContext>
  );
};

export default Cart;
