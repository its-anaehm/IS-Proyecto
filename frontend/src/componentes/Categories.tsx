//import { Grid } from "@material-ui/core";
import CategoryObj from "../interfaces/CategoryObj";
import categoryPlaceholder from "../img/item-placeholder.png";
import { useEffect, useState } from "react";
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';


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

interface CategoriesProps{
  categories: CategoryObj[]
}

function Categories({
  categories
}:CategoriesProps){
  const classes = useStyles();

  
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
        {categories.map((cat: CategoryObj) => (
          <ImageListItem
          key={cat.Imagen}
          className={classes.imageItem}
          style={{
              backgroundColor: colors[parseInt(`${cat.id}`)%colors.length ]
          }}
          >
              <Link to={`/Categories/${cat.id}`} style={{textDecoration:"none"}}>
                  <Typography
                  variant="h6"
                  style={{
                      textAlign:"center",
                      fontWeight: "bold",
                      color: "black",
                      textDecoration: "none"
                  }}
                  >
                      {cat.Nombre}
                  </Typography>
                  <img
                  src={`http://localhost:4000/uploads/${cat.Imagen}`}
                  alt={cat.Nombre}
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

export default Categories;