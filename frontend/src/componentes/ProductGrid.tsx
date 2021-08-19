import ProductObj from "../interfaces/ProductObj";
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { FormatAlignJustify } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  grid: {
      marginLeft: "0%"
  },
  grid_item: {
      marginBottom: "1%",
      marginTop:"2%"
  },
  imageList:{
      //flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      //transform: 'translateZ(0)',
      width:"100%",
      margin: 0,
      padding: 10,
  },
  imageItem:{
      marginRight: 10,
      display: "flex",
      justifyContent: "center",
      justifyItems: "center",
      //height: "80%",
      borderRadius: 15,
      marginBottom: 10
  },
  root: {
    maxWidth: 345,
    backgroundColor: 'lightgray',
    textDecoration: 'none',
    position: 'relative'
  }
}));

interface ProductGridProps{
  products: ProductObj[]
}

function ProductGrid({
  products
}:ProductGridProps){
  const classes = useStyles();
  return(
    <div
    style={{
      marginTop: 15
    }}
    >
      <Grid container lg={10} spacing={4}>
        {products.map((producto: ProductObj)=>(
            <Grid item lg={4}>
              <Link to={`/products/${producto.id}`}  className={classes.root}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={producto.name}
                    height="140"
                    image={`http://localhost:4000/uploads/${producto.images[0]}`}
                    title={producto.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {producto.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {`${producto.municipy}, ${producto.department}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    {`LPS.${producto.price}`}
                  </Button>
                  <Button size="small" color="primary">
                    {producto.date}
                  </Button>
                </CardActions>
              </Card>
              </Link>
            </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ProductGrid;