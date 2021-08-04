import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import ProductObj from "../interfaces/ProductObj";
import Typography from '@material-ui/core/Typography';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import CategoryObj from '../interfaces/CategoryObj';


const useStyles = makeStyles((theme) => ({
    imageList:{
        flexWrap: 'nowrap',
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
    grid_item: {
        marginBottom: "1%",
        marginTop:"2%"
    },
    pill:{
        //borderRadius: 15,
        backgroundColor: "#C4C4C4",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 914,
        height: 212
    }
}));

interface UserInfoProps{
    suscribedCat: CategoryObj[],
    wishlist: ProductObj[]
}

function getRandomColor() : string{
    let colors = ["#20A0EB", "#99E265", "#FFBD4A", "#F95959", "#A3A847"];
    return colors[ Math.floor(Math.random() * colors.length) ];
}


function UserInfo({
    suscribedCat,
    wishlist
}:UserInfoProps){
    
    const classes = useStyles();

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

    return (
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
    );
}

export default UserInfo;