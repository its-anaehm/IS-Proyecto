import Grid from '@material-ui/core/Grid';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import Typography from '@material-ui/core/Typography';
import CategoryObj from '../interfaces/CategoryObj'
import categoryPlaceholder from "../img/item-placeholder.png";
import { Link } from 'react-router-dom';

function getRandomColor() : string{
    let colors = ["#20A0EB", "#99E265", "#FFBD4A", "#F95959", "#A3A847"];
    return colors[ Math.floor(Math.random() * colors.length) ];
}

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
    banner: {
        maxWidth: "100%"
    },
    grid_item: {
        marginBottom: "1%",
        marginTop:"2%"
    },
    imageList:{
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        width: 1184
    },
    imageItem:{
        marginRight: 10,
        display: "flex",
        justifyContent: "center",
        height: "100%"
    }
  }));

let templateCategories: CategoryObj[] = [{
    Nombre: "Categoria",
    Imagen: categoryPlaceholder,
    Num_Visita: 0
}];

function GuestHome(){
    const classes = useStyles();
    const [popularCat, setPopularCat] = useState<CategoryObj[]>(templateCategories);

    function getPopularCategories(){
        fetch("http://localhost:4000/category/popular", {
            method: 'POST',
            headers: {'Content-Type': 'application/json','Accept': 'application/json'}
        }).then( response =>{
            if(response.status < 400){
                response.json().then( jsonResponse => {
                    const categorias: CategoryObj[] = jsonResponse.popular;


                    setPopularCat(categorias);
                } );
            }
        } ).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getPopularCategories();
        console.log(popularCat);
    }, [])

    return(
        <>
        <Grid container className={classes.grid} justify="center">
            <Grid item lg={12} className={classes.grid_item}>
                <video
                    className={classes.banner}
                    width="1184"
                    height="400"
                    src="banner.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                </video>
            </Grid>
            <Typography variant="h6" style={{fontWeight:"bold"}}>
                Categorías más Populares
            </Typography>
            <Grid
            item
            lg={12}
            className={classes.grid_item}
            style={{
                height: "max-content"
            }}
            >
                <ImageList
                cols={6}
                className={classes.imageList}
                rowHeight={200}
                >
                    {popularCat.map( (cat: CategoryObj) => (
                        <ImageListItem
                        key={cat.Imagen}
                        className={classes.imageItem}
                        style={{
                            backgroundColor: getRandomColor()
                        }}
                        >
                            <Link to={`/categories/${cat.Nombre}`} style={{textDecoration:"none"}}>
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
                    ) )}
                </ImageList>
            </Grid>
        </Grid>
        </>
    );
}

export default GuestHome;