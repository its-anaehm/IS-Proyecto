import { Link, useParams } from 'react-router-dom';
import ParamInterface from '../interfaces/ParamInterface';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import ProductObj from '../interfaces/ProductObj';
import Button from '@material-ui/core/Button';
import CategoryObj from '../interfaces/CategoryObj';
import CommentObj from '../interfaces/CommentObj';
import CommentSection from '../componentes/CommentSection';
import UserObj from '../interfaces/UserObj';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    main:{
        marginLeft: "5%",
        marginRight: "15%"
    },
    productText:{
        paddingLeft:30,
        paddingBottom: 8
    }
  }));

let templateProduct: ProductObj = {
    id: 0,
    owner: "Luisito Comunica",
    category: 3,
    department: "Olancho",
    municipy: "Juticalpa",
    name: "Sofá de vaca",
    price: "5000.00",
    details: "Sofá de vaca elegante y a precio comodo.",
    images: ["cowch.jpg"],
    date: "2021-07-18"
};

let templateComments: CommentObj[] = [
    {
      usuario: "Omen",
      contenido: "Comentario de Prueba en el producto Huawei Mate Pro",
      fecha: "2021-07-18T22:11:34.000Z"
    },
    {
      usuario: "Andrea",
      contenido: "Comentario de Andrea en el producto Huawei Mate Pro",
      fecha: "2021-07-18T22:11:34.000Z"
    }
  ];

interface SingleProductProps{
    auth: boolean,
    categories: CategoryObj[],
    currentUser: UserObj
}

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


function SingleProduct({
    auth,
    categories,
    currentUser
}:SingleProductProps){
    let classes = useStyles();
    const { id } = useParams<ParamInterface>();
    const [productInfo, setProductInfo] = useState<ProductObj>(templateProduct);
    const [comments, setComments] = useState<CommentObj[]>(templateComments);
    const [wishlist, setWishlist] = useState<ProductObj[] | []>(templateProducts);
    const [fav, setFav] = useState<boolean>(false);
    let bg: string = fav? "#F95959": "#a9a9a9";

    function getComments(){
        fetch(`http://localhost:4000/comments/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${localStorage.getItem("USR_TKN")}`
            }
        }).then(response=>{
            if(response.status<400){
                response.json().then(jsonResponse => {
                    //console.log(jsonResponse);
                    setComments(jsonResponse.comments);
                })
            }
        });
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

                    for(let i=0; i<productos.length; i++){
                        if(productos[i].id === parseInt(`${id}`) ){
                            setFav(true);
                            break;
                        }
                    }

                    setWishlist(productos);
                } );
            }
        } ).catch(error => {
            console.log(error);
        });
    }

    function getProductInfo(){
        fetch(`http://localhost:4000/products/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(response=>{
            if(response.status<400){
                response.json().then(jsonResponse => {
                    //console.log(jsonResponse);
                    setProductInfo(jsonResponse[0]);
                })
            }
        });
    }

    function findCategory(id: number):string{
        let found= "";
        for(let i=0; i<categories.length; i++){
            if(categories[i].id === id){
                found = categories[i].Nombre;
                break;
            }
        }

        return found;
    }

    function showComments(){
        return(
            <CommentSection
            comments={comments}
            getComments={getComments}
            currentUser={currentUser}
            productID={id}
            />
        );
    }

    function noComments(){
        return(
            <div>
                <Typography align="center">
                    <em>
                        Debes de estar registrado si deseas realizar comentarios y también para poder
                        contactarte con el vendedor si te interesa el producto.
                    </em>
                </Typography>
            </div>
        );
    }

    function showButton(){
        //let hvr_bg: string = fav? "#a9a9a9": "F95959";

        return(
            <Button
            type="button"
            style={{
                color: bg,
            }}
            onClick={changeWishList}
            >
                <FavoriteIcon fontSize="large"/>
            </Button>
        );
    }

    function changeWishList(){
        if(fav){
            removeFromWishList();
        }else{
            addToWishList();
        }
    }

    function removeFromWishList(){
        fetch(`http://localhost:4000/home/removeSub/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${localStorage.getItem("USR_TKN")}`
            }}
        ).then(response =>{
            if(response.status < 400){
                setFav(false);
                getWishlist();
            }
        }).catch(e=>{
            console.log(e);
        });
    }

    function addToWishList(){

        fetch(`http://localhost:4000/home/subscribe/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${localStorage.getItem("USR_TKN")}`
            }}
        ).then(response =>{
            if(response.status < 400){
                setFav(true);
                getWishlist();
            }
            
        }).catch(e=>{
            console.log(e);
        });

    }

    useEffect(()=>{
        getProductInfo();
        getWishlist();

        if(auth){
            getComments();
        }
    },[]);

    return(
        <>
            <Container component="main" maxWidth="lg" className={classes.main}>
            <CssBaseline />
                <div className={classes.paper}>
                    <Grid
                    container
                    lg={12}
                    md={12}
                    spacing={6}
                    style={{
                        marginTop: 10
                    }}
                    >
                        <Grid
                        item
                        lg={5}
                        md={5}
                        >
                            <div>
                                <Typography variant="h4" display="inline">
                                    <strong>{productInfo.name}</strong>
                                </Typography>
                                {auth? showButton(): undefined}
                            </div>
                            <img
                            src={`http://localhost:4000/uploads/${productInfo.images[0]}`}
                            alt={productInfo.name}
                            style={{
                                borderRadius: 8,
                                maxWidth: '95%'
                            }}
                            />
                        </Grid>

                        <Grid
                        item
                        lg={7}
                        md={7}
                        >
                            <div
                            style={{
                                border: '2px solid',
                                borderRadius: 8,
                                minWidth: '90%',
                                minHeight: '99%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                            >
                                <div>
                                    <Typography
                                    variant="h5"
                                    align="center"
                                    style={{
                                        paddingTop: 6,
                                        paddingBottom: 12
                                    }}
                                    >
                                        <strong>Detalles</strong>
                                    </Typography>
                                    <Typography
                                    variant="body1"
                                    align="justify"
                                    style={{
                                        paddingLeft:30,
                                        paddingRight: 30
                                    }}
                                    >
                                        {productInfo.details}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography
                                    variant="body2"
                                    align="left"
                                    className={classes.productText}
                                    >
                                        <strong>Ubicación:</strong>{` ${productInfo.municipy}, ${productInfo.department}`}
                                    </Typography>

                                    <Typography
                                    variant="body2"
                                    align="left"
                                    className={classes.productText}
                                    >
                                        <strong>Publicado por:</strong>{` ${productInfo.owner}`}
                                    </Typography>

                                    <Typography
                                    variant="body2"
                                    align="left"
                                    className={classes.productText}
                                    >
                                        <strong>Fecha de Publicación:</strong>{` ${productInfo.date}`}
                                    </Typography>

                                    <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyItems: 'space-between'
                                    }}
                                    >
                                        <Typography
                                        variant="body2"
                                        align="left"
                                        className={classes.productText}
                                        display="inline"
                                        >
                                            <strong>Categoría:</strong>{` ${findCategory(
                                                parseInt(`${productInfo.category}`)
                                                )}`}
                                        </Typography>

                                        <Typography
                                        variant="button"
                                        align="right"
                                        className={classes.productText}
                                        display="inline"
                                        style={{
                                            paddingRight: 30
                                        }}
                                        >
                                            <strong>Precio:</strong>{` LPS.${productInfo.price}`}
                                        </Typography>
                                    </div>

                                </div>
                            </div>
                        </Grid>

                        <Grid
                        item
                        md={12}
                        >
                            <Typography
                            variant="h5"
                            >
                                <strong>Comentarios</strong>
                            </Typography>
                            { auth ? showComments() : noComments() }
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    );
}

export default SingleProduct;