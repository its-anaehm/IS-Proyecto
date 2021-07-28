import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { CardMedia, Grid, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import ProductObj from '../interfaces/ProductObj';
import Typography from '@material-ui/core/Typography';

interface CardScrollableProps{
    products: ProductObj[]
}

const useStyles = makeStyles((theme)=>({
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardRoot:{
    display: 'flex',
    width: '90%',
    margin: 4
  },
  cover:{
    maxWidth: '30%'
  }
}));

function CardScrollable({
  products
}:CardScrollableProps){
  const classes = useStyles();


  return(
    <div>
      <Grid
      container
      >
        { products.map( (product: ProductObj) => {
          return(
            <Grid
            item
            >
              <Card className={classes.cardRoot}>
                <div className={classes.details}>
                  <img
                  style={{
                    maxWidth: '20%'
                  }}
                  src={`http://localhost:4000/uploads/${product.images[0]}`}
                  alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="button">
                      {product.name}
                    </Typography>
                    <Typography variant={"body1"}>
                      {product.date}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>
          )
        }) }
      </Grid>
    </div>
  );
}

export default CardScrollable;