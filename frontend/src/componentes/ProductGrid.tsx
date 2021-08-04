import ProductObj from "../interfaces/ProductObj";
import Typography from '@material-ui/core/Typography';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

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
  }
}));


const colors = ["#20A0EB", "#99E265", "#FFBD4A", "#F95959", "#A3A847"];

interface ProductGridProps{
  products: ProductObj[]
}

function ProductGrid({
  products
}:ProductGridProps){
  const classes = useStyles();
  return(
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
              <Link
              to={`/Products/${cat.id}`}
              style={{
                textDecoration:"none",
                //display:"flex",
                //justifyItems:
              }}
              >
                
                  <img
                  src={`http://localhost:4000/uploads/${cat.images[0]}`}
                  alt={cat.name}
                  style={{
                      //height: 530,
                      height: "35%",
                      //width: "80%",
                      padding: 5,
                      //paddingBottom: 10,
                      borderRadius: 15
                  }}
                  ></img>
                  <Typography
                  variant="button"
                  //display="inline"
                  style={{
                      textAlign:"center",
                      fontWeight: "bold",
                      color: "black",
                      textDecoration: "none"
                  }}
                  >
                      {cat.name}
                  </Typography>
                  
                    <Typography
                    variant="body2"
                    style={{
                      textDecoration: "none"
                    }}
                    >
                      {`${cat.municipy}, ${cat.department}`}
                    </Typography>
                  <div
                  style={{
                    padding:5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyItems: 'space-between'
                  }}
                  >
                    <Typography
                    variant="body2"
                    display="inline"
                    align="left"
                    style={{
                      textDecoration: "none"
                    }}
                    >
                      {cat.date}
                    </Typography>
                    <Typography
                    variant="overline"
                    display="inline"
                    align="right"
                    style={{
                      textDecoration: "none"
                    }}
                    >
                      {`LPS.${cat.price}`}
                    </Typography>
                  </div>
              </Link>
          </ImageListItem>
        ))}
      </ImageList>
  );
}

export default ProductGrid;