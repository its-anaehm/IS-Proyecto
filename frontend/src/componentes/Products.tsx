//import { Grid } from "@material-ui/core";
import placeholder from "../img/item-placeholder.png";
import { useEffect, useState } from "react";
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import ProductObj from "../interfaces/ProductObj";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


const colors = ["#20A0EB", "#99E265", "#FFBD4A", "#F95959", "#A3A847"];


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
      height: "80%",
      borderRadius: 15,
      marginBottom: 10
  }
}));

let templateProducts: ProductObj[] = [{
    id: 0,
    owner: "Juan Orlando",
    department: "Honduras de alla",
    municipy: "Tela",
    name: "Baleada",
    price: "13",
    details: "Baleada con queso y horchata",
    images: [`${placeholder}`],
    date: "ayer"
}];

function Products(){
  const classes = useStyles();
  const [products, setProducts] = useState<ProductObj[] | []>(templateProducts);

  useEffect(() => {
    getProducts();
  }, []);

  function getProducts(){
    fetch('http://localhost:4000/products/productInfo ',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }
    ).then( response => {
      if(response.status < 400){
        response.json().then(jsonResponse => {
          //console.log()
          setProducts(jsonResponse.message);
        })
      }
    } ).catch(e=>{
      console.log(e);
    });
  }

  
  return(
    <div
    style={{
      width: '100%'
    }}
    >
      <ImageList
      cols={5}
      className={classes.imageList}
      //rowHeight={200}
      >
        {products.map((cat: ProductObj) => (
          <ImageListItem
          key={cat.id}
          className={classes.imageItem}
          style={{
              backgroundColor: colors[parseInt(`${cat.id}`)%colors.length ]
          }}
          >
              <Link to={`/Products/${cat.id}`} style={{textDecoration:"none"}}>
                
                  <Typography
                  variant="h6"
                  style={{
                      textAlign:"center",
                      fontWeight: "bold",
                      color: "black",
                      textDecoration: "none"
                  }}
                  >
                      {cat.name}
                  </Typography>
                  <img
                  src={`http://localhost:4000/uploads/${cat.images[0]}`}
                  alt={cat.name}
                  style={{
                      //height: 530,
                      height: "80%",
                      padding: 2
                  }}
                  ></img>
              </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default Products;