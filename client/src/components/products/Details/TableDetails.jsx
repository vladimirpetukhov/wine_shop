import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    title: {
      fontWeight: 700,
    },
    dash: {
      fontSize: 50,
      paddingRight: 20,
      paddingLeft: 20,
      color: theme.palette.primary.text,
    },
    value: {
        fontStyle: 'italic'
    }
  };
});

const TableDetails = ({ product }) => {
  const classes = useStyles();
  return (
    <table>
      <tbody>
        <tr>
          <td className={classes.title}>Реколта</td>
          <td className={classes.dash}>-</td>
          <td className={classes.value}>{product.year}</td>
        </tr>
        <tr>
          <td className={classes.title}>Вид</td>
          <td className={classes.dash}>-</td>
          <td className={classes.value}>{product.type}</td>
        </tr>
        <tr>
          <td className={classes.title}>Обем</td>
          <td className={classes.dash}>-</td>
          <td className={classes.value}>{product.size}мл.</td>
        </tr>
        <tr>
          <td className={classes.title}>Алкохол</td>
          <td className={classes.dash}>-</td>
          <td className={classes.value}>{product.alcohol}%</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableDetails;
