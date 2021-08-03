import { Link, useParams } from 'react-router-dom';
import ParamInterface from '../interfaces/ParamInterface';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import ProductObj from '../interfaces/ProductObj';
import placeholder from "../img/item-placeholder.png";
import Button from '@material-ui/core/Button';
import CategoryObj from '../interfaces/CategoryObj';
import Filter from '../componentes/Filter';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'none'
    },
    main:{
        marginLeft: "5%",
        marginRight: "15%"
    },
    submit: {
        //width: "30%",
        margin: theme.spacing(1, 0, 2),
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        width: 'max-content',
        border: "4px solid",
        fontWeight: "bold",
        '&:hover':{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.background.paper,
          }
      },
      links:{
        textDecoration: 'none',
        '&:visited':{
            color: theme.palette.primary.main
        },
        color: theme.palette.primary.main
    }
  }));

interface suscribedCategory{
    fk_id_categoria: number,
    Nombre: string,
    Imagen: string,
    Num_Visita: number
}

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

let templateSuscribed: CategoryObj[] = [{
    id: 0,
    Nombre: "Categoria",
    Imagen: `${placeholder}`,
    Num_Visita: 0
}];

interface SingleCategoryProps{
    auth: boolean
}

function SingleCategory({
    auth
}:SingleCategoryProps){
    const classes = useStyles();
    let { id } = useParams<ParamInterface>();
    const [categoryName, setCategoryName] = useState<string>("Categoria");
    const [products, setProducts] = useState<ProductObj[]>(templateProducts);
    const [suscribed, setSuscribed] = useState<boolean>(false);
    const [suscribedCat, setSuscribedCat] = useState<CategoryObj[]>(templateSuscribed);

    function changeSuscription(){
        //console.log(suscribed);
        if(suscribed){
            //console.log("quitar");
            unsuscribeCategory();
        }else{
            //console.log("Suscribirse");
            suscribeCategory();
        }
    }

    function getSuscribed(){
        fetch("http://localhost:4000/category/suscribed", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${localStorage.getItem("USR_TKN")}`
                }
            }).then(response =>{
                if(response.status < 400){
                    response.json().then( jsonResponse =>{
                        let cats: CategoryObj[] = jsonResponse.suscribedCategories;

                        let found: boolean = false;

                        for(let i=0; i<cats.length; i++){
                            if(cats[i].id === parseInt(id)){
                                found = true;
                                break;
                            }
                        }

                        setSuscribed(found);
                        setSuscribedCat(cats);
                    } );
                }
            }).catch(e=>{
                console.log(e);
            })
    }

    function getCategoryInfo(){
        fetch(`http://localhost:4000/products/productCategory/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            if(response.status < 400){
                
                response.json().then(jsonResponse => {
                    setCategoryName(`${jsonResponse.categoryName}`);

                    setProducts(jsonResponse.message.map( (product:ProductObj)=>({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        details: product.details,
                        date: product.date,
                        images: product.images 
                    }) ));
                    //console.log(jsonResponse);
                });
            }
        }).catch(e=>{
            console.log(e);
        });
    }

    function showButton(){
        return(
            <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={changeSuscription}
            >
            {suscribed? "Remover": "Sucribirse"}
            </Button>
        );
    }

    function suscribeCategory(){
        fetch(`http://localhost:4000/category/${id}/suscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${localStorage.getItem("USR_TKN")}`
            }
        }).then(response=>{
            if(response.status < 400){
                setSuscribed(true);
                getSuscribed();
            }
        }).catch(e=>{
            console.log(e);
        });
    }
  
    function unsuscribeCategory(){
        fetch(`http://localhost:4000/category/${id}/unsuscribe`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${localStorage.getItem("USR_TKN")}`
            }
        }).then(response=>{
            if(response.status < 400){
                setSuscribed(false);
                getSuscribed();
            }
        }).catch(e=>{
            console.log(e);
        });
    }

    useEffect(()=>{
        getCategoryInfo();
        getSuscribed();
    },[]);

    return(
        <>
            <Container component="main" maxWidth="md" className={classes.main}>
            <CssBaseline />
                <div className={classes.paper}>
                    <Filter setProducts={setProducts}/>
                    <Grid
                    container
                    >
                        <Grid
                        item
                        >
                            <div
                            >
                                <Typography
                                variant="h4"
                                style={{
                                    paddingTop: 12,
                                    marginRight: 20
                                }}
                                >
                                    Categoria: <strong>{categoryName}</strong>
                                </Typography>
                                {auth? showButton():undefined}
                            </div>
                        </Grid>
                        <Grid
                        item
                        >
                            <div
                            style={{
                                overflow:'auto'
                            }}
                            >
                                <Grid
                                container
                                >
                                    {products.map( (prod: ProductObj) =>(
                                        <Grid
                                        item
                                        md={12}
                                        style={{
                                            display: 'flex',
                                            margin: 10,
                                            border: '2px solid',
                                            padding: 10,
                                            borderRadius: 6
                                        }}
                                        >
                                            <Link
                                            to={`/products/${prod.id}`}
                                            className={classes.links}
                                            style={{
                                                display: 'flex',
                                                maxWidth: '100%',
                                            }}
                                            >
                                                <img
                                                src={`http://localhost:4000/uploads/${prod.images[0]}`}
                                                alt={prod.name}
                                                style={{
                                                    maxWidth:'25%',
                                                    paddingRight: 10,
                                                    borderRadius: 6
                                                }}
                                                />

                                                <div>
                                                    <Typography variant="h5">
                                                        {prod.name}
                                                    </Typography>
                                                    <p>
                                                        {prod.details}
                                                    </p>
                                                </div>
                                            </Link>
                                        </Grid>
                                    ) )}
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    );
}

export default SingleCategory;