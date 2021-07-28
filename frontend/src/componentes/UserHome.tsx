import Grid from '@material-ui/core/Grid';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import Typography from '@material-ui/core/Typography';
import CategoryObj from '../interfaces/CategoryObj'
import categoryPlaceholder from "../img/item-placeholder.png";
import { Link } from 'react-router-dom';
import UserObj from '../interfaces/UserObj';
import ProductObj from '../interfaces/ProductObj';
import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

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
    grid_item: {
        marginBottom: "1%",
        marginTop:"2%"
    },
    imageList:{
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        width: 950,
        margin: 0,
        padding: 10,
    },
    imageItem:{
        marginRight: 10,
        display: "flex",
        justifyContent: "center",
        height: "100%",
        borderRadius: 15
    },
    pill:{
        //borderRadius: 15,
        backgroundColor: "#C4C4C4",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 914,
        height:212
    },
    form:{
        backgroundColor: "#C4C4C4",
        display: 'flex',
        //justifyContent: 'center',
        flexDirection: 'column',
        height: 534,
        width: 308,
        marginRight: 40,
        marginTop: theme.spacing(1),
        padding: 11
    },
    formItem:{
        paddingTop: 11
    }
  }));

let templateCategories: CategoryObj[] = [{
    id: 0,
    Nombre: "Categoria",
    Imagen: categoryPlaceholder,
    Num_Visita: 0
}];

let templateProducts: ProductObj[] = [{
    id: 1,
    category: 1,
    department: "department",
    municipy: "municipy",
    name: "name",
    price: "price",
    details: "description",
    images: ["image1"]
}];


interface UserHomeProps{
    currentUser: UserObj
}

function UserHome({
    currentUser
}:UserHomeProps){
    const classes = useStyles();
    const [suscribedCat, setSubscribedCat] = useState<CategoryObj[] | []>(templateCategories);
    const [wishlist, setWishlist] = useState<ProductObj[] | []>(templateProducts);

    function getSubscribedCategories(){
        fetch("http://localhost:4000/category/suscribed", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${localStorage.getItem("USR_TKN")}`
            }
        }).then( response =>{
            if(response.status < 400){
                response.json().then( jsonResponse => {
                    //console.log(jsonResponse);

                    const categorias: CategoryObj[] = jsonResponse.suscribedCategories;


                    setSubscribedCat(categorias);
                } );
            }
        } ).catch(error => {
            console.log(error);
        });
    }

    function showCategories(){
        if(suscribedCat.length === 0){
            return(
                <Typography variant="h5" style={{fontWeight:"bold"}}>
                    No se encuentra suscrito a ninguna categoria.
                </Typography>
            );
        }else{
            return(
                <ImageList
                cols={3.5}
                className={classes.imageList}
                rowHeight={200}
                >
                    {suscribedCat.map( (cat: CategoryObj) => (
                        <ImageListItem
                        key={cat.Imagen}
                        className={classes.imageItem}
                        style={{
                            backgroundColor: getRandomColor()
                        }}
                        >
                            <Link to={`/categories/${cat.id}`} style={{textDecoration:"none"}}>
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
            );
        }
    }

    function getWishlist(){
        fetch("http://localhost:4000/home/wishlist", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${localStorage.getItem("USR_TKN")}`
            }
        }).then( response =>{
            if(response.status < 400){
                response.json().then( jsonResponse => {
                    //console.log(jsonResponse);

                    const productos: ProductObj[] = jsonResponse.message;


                    setWishlist(productos);
                } );
            }
        } ).catch(error => {
            console.log(error);
        });
    }

    function showWishlist(){
        if(wishlist.length === 0){
            return(
                <Typography variant="h5" style={{fontWeight:"bold"}}>
                    No tiene ningun producto en la lista de deseos.
                </Typography>
            );
        }else{
            return(
                <ImageList
                cols={3.5}
                className={classes.imageList}
                rowHeight={200}
                >
                    {wishlist.map( (product: ProductObj) => (
                        <ImageListItem
                        key={product.id}
                        className={classes.imageItem}
                        style={{
                            backgroundColor: getRandomColor()
                        }}
                        >
                            <Link to={`/products/${product.id}`} style={{textDecoration:"none"}}>
                                <Typography
                                variant="h6"
                                style={{
                                    textAlign:"center",
                                    fontWeight: "bold",
                                    color: "black",
                                    textDecoration: "none"
                                }}
                                >
                                    {product.name}
                                </Typography>
                                <img
                                src={`http://localhost:4000/uploads/${product.images[0]}`}
                                alt={product.name}
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
            );
        }
    }


    useEffect(() => {
        getSubscribedCategories();
        getWishlist();
        //console.log(suscribedCat);
    }, [])

    return(
        <>

        <Grid container className={classes.grid} justify="center">
            <Grid
            item
            lg={12}
            className={classes.grid_item}
            >
                <Typography variant="h4">
                    ¡Bienvenido de vuelta, <strong>{currentUser.Nombre}</strong>!
                </Typography>
            </Grid>
            <Grid container lg={12} spacing={2}>
                <Grid
                container
                lg={3}
                alignContent={"flex-start"}
                >
                    <form className={classes.form}>
                        <TextField
                        label="Buscar"
                        id="standard-size-small"
                        defaultValue=""
                        size="small"
                        inputProps={{
                            startAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon/>
                                </InputAdornment>
                            )
                        }}
                        />

                        <Typography
                        variant="h5"
                        style={{
                            paddingTop: "40px",
                            fontWeight: "bold"
                        }}
                        >
                            Filtrado por Categorias
                        </Typography>
                        <Typography
                        variant="h6"
                        style={{
                            paddingTop: "10px",
                        }}
                        >
                            Categoria
                        </Typography>
                        <TextField
                        id="category-select"
                        select
                        >
                        </TextField>

                        {/************ Regiones***********/}
                        <Typography
                        variant="h5"
                        style={{
                            paddingTop: "40px",
                            fontWeight: "bold"
                        }}
                        >
                            Filtrado por Regiones
                        </Typography>
                        <Typography
                        variant="h6"
                        style={{
                            paddingTop: "10px",
                        }}
                        >
                            Departamento
                        </Typography>
                        <TextField
                        id="department-select"
                        select
                        >
                        </TextField>
                        <Typography
                        variant="h6"
                        style={{
                            paddingTop: "10px",
                        }}
                        >
                            Municipio
                        </Typography>
                        <TextField
                        id="municipy-select"
                        select
                        >
                        </TextField>

                    </form>
                </Grid>
                <Grid
                container
                lg={9}
                alignContent={"flex-end"}
                >
                    <Grid
                    item
                    className={classes.grid_item}
                    style={{
                        height: "max-content"
                    }}
                    >
                        <Typography variant="h6" style={{fontWeight:"bold"}}>
                            Tus Categorias Suscritas
                        </Typography>
                        <div className={classes.pill}>
                            {showCategories()}
                        </div>
                    </Grid>
                    <Grid
                    item
                    className={classes.grid_item}
                    style={{
                        height: "max-content"
                    }}
                    >
                        <Typography variant="h6" style={{fontWeight:"bold"}}>
                            Tu Lista de Deseos
                        </Typography>
                        <div className={classes.pill}>
                            {showWishlist()}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </>
    );
}

export default UserHome;