import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { Button, CardMedia, Grid, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import ProductObj from '../interfaces/ProductObj';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';

interface CardScrollableProps{
    products: ProductObj[],
    removeFunction: (id: number)=>void
}

const useStyles = makeStyles((theme)=>({
  cardRoot:{
    width: '100%',
    margin: 4
  },
  pill:{
    width: '90%',
    border: '2px solid',
    borderRadius: 6,
    margin: 5,
    display: 'flex',
    justifyItems: 'center'
  }
}));

function CardScrollable({
  products,
  removeFunction
}:CardScrollableProps){
  const classes = useStyles();

  function removeProduct(productID: number){
    removeFunction(productID);
  }


  return(
    <div>
      <Grid
      container
      >
        { products.map( (product: ProductObj) => {
          return(
            <Grid
            item
            className={classes.pill}
            >
              <div
              style={{
                width: '80%',
                padding: 3,
                marginBottom: 4
              }}
              >
                <Typography>
                  {product.name}
                </Typography>
                <Typography>
                  <em>{product.date}</em>
                </Typography>
              </div>
              <Button
              type="button"
              color="primary"
              onClick={ ()=>{
                removeProduct(product.id);
              } }
              >
                <CancelIcon/>
              </Button>
            </Grid>
          )
        }) }
      </Grid>
    </div>
  );
}

export default CardScrollable;