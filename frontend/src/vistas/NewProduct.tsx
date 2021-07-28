import { Button, CssBaseline, Grid, InputAdornment } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Redirect } from "react-router-dom";
//import tempImg from "../img/addImg.png";
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from "react";
import CategoryObj from "../interfaces/CategoryObj";
import Department from "../interfaces/Department";
import Municipality from "../interfaces/Municipality";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    dividerFullWidth: {
        margin: `5px 0 0 ${theme.spacing(2)}px`,
        width: "100%"
      },
    divider:{
        border: "1px solid",
        color: theme.palette.primary.main
    },
    aceptar: {
    //width: "30%",
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    border: "4px solid",
    fontWeight: "bold",
    '&:hover':{
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.background.paper,
        }
    },
    cancelar: {
        //width: "30%",
        margin: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        border: "4px solid",
        fontWeight: "bold",
        '&:hover':{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.paper,
        }
    },
    grid_item:{
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    inputs:{
        margin: theme.spacing(1)
    },
    input: {
      display: 'none',
    },
    
  }));

let templateCategories: CategoryObj[] = [{
    id: 0,
    Nombre: "Categoria"
}];

let templateDepartment: Department[] = [{
    id: 0,
    Nombre: "Departamento"
}];

let templateMunicipality: Municipality[] = [{
    id: 0,
    Nombre: "Departamento"
}];

interface NewProductProps{
    auth: boolean
}

function NewProduct({
    auth
}:NewProductProps){
    const classes = useStyles();
    const [categories, setCategories] = useState<CategoryObj[]>(templateCategories);
    const [departments, setDepartments] = useState<Department[]>(templateDepartment);
    const [municipalities, setMunicipalities] = useState<Municipality[]>(templateMunicipality);
    const [redirectHome, setRedirectHome] = useState<boolean>(false);
    const [formErr, setFormErr] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>("");
    const [productImage, setProductImage] = useState<File|null>(null);
    const [price, setPrice] = useState<string>("");
    const [redirectLink, setRedirectLink] = useState<string>("/");

    function createProduct(e: React.FocusEvent<HTMLFormElement>){
        e.preventDefault();

        let requestURL: string = 'http://localhost:4000/products/';

        const formData: FormData = new FormData();

        if(productImage == null){
            setFormErr(true);

            setErrMessage("Es necesario que suba una imagen del producto.");
        }else{
            setFormErr(false);
            formData.append('name', e.target.product_name.value);
            formData.append('price', price);
            formData.append('description', e.target.product_desc.value);
            formData.append('category',e.target.select_category.value );
            formData.append('department', e.target.select_department.value);
            formData.append('municipy', e.target.select_municipality.value);
            formData.append('productImages', productImage as Blob );
            formData.append('status', e.target.select_state.value);
    
            console.log(formData);
            
            fetch(requestURL, {
                method: 'POST',
                headers: {
                    'Accept': 'multipart/form-data',
                    'Authorization':`${localStorage.getItem("USR_TKN")}`
                },
                body: formData
              }).then(response => {
                  if( response.status >= 400){
                      setErrMessage("");
                      setFormErr(true);
                  }else{
                      //console.log(response);
                      response.json().then(jsonResponse => {
                          //console.log(jsonResponse);
                          setRedirectLink(`/products/${jsonResponse.id}`);
                          setRedirectHome(true);
                      });
                  }
              }).catch(error => {
                  setErrMessage("");
                  setFormErr(true);
              });
        }

    }

    function getCategories(){
        fetch("http://localhost:4000/category", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then( response =>{
            if(response.status < 400){
                response.json().then( jsonResponse => {
                    

                    setCategories( jsonResponse.category.map( (cat:CategoryObj) => ({
                        id: cat.id,
                        Nombre: cat.Nombre
                    }) ) );
                } );
            }
        } ).catch(error => {
            console.log(error);
        });
    }

    function getDepartments(){
        fetch("http://localhost:4000/filters/department", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then( response =>{
            if(response.status < 400){
                response.json().then( jsonResponse => {
                    //console.log(jsonResponse);

                    setDepartments( jsonResponse.departments.map( (dep:Department) => ({
                        id: dep.id,
                        Nombre: dep.Nombre
                    }) ) );
                } )
            }
        } ).catch(error => {
            console.log(error);
        });

    }

    function getMunicipalities(dep: number){
        fetch(`http://localhost:4000/filters/municipality/id=${dep}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then( response =>{
            if(response.status < 400){
                response.json().then( jsonResponse => {
                    //console.log(jsonResponse);

                    setMunicipalities( jsonResponse.municipalities.map( (mun: Municipality) => ({
                        id: mun.id,
                        Nombre: mun.Nombre
                    }) ) );
                } )
            }
        } ).catch(error => {
            console.log(error);
        });

    }

    function changeDepartment(event: React.ChangeEvent<HTMLInputElement>){
        getMunicipalities(parseInt(`${event.target.value}`));
    }

    useEffect(() => {
        getCategories();
        getDepartments();
        getMunicipalities(1);
    }, [])

    function cancelProduct(){
        setRedirectHome(true);
    }

    function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.files !== null){

            setProductImage(e.target.files[0]);
            
        }

        /*let fReader: FileReader = new FileReader();*/
    }

    function quitarImagen(){
        setProductImage(null);
    }

    function showNoPreview(){
        return(
            <Typography variant="h5" style={{fontWeight:"bold", justifyItems:'center', width: '100%', height: '100%'}}>
                No ha subido imagenes.
            </Typography>
        );
    }

    function showPreview(){
        return(
            <Card>
                <CardContent>
                    <Typography variant="h5">
                        {`${productImage?.name}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                    onClick={()=>{quitarImagen()}}
                    style={{
                        textAlign:"center",
                        fontWeight: "bold",
                        color: "black",
                        textDecoration: "none"
                    }}
                    >
                        Eliminar
                    </Button>

                </CardActions>
            </Card>
        );
        
        
    }


    function showError(){
        let message:string = "Asegurese de llenar todos los datos.";

        if(errMessage === ""){
            setErrMessage(message);
        }

        return(
        <h3 style={{color: "red"}}>{errMessage}</h3>
        );
    }

    function handlePrice(e: React.ChangeEvent<HTMLInputElement>){
        let newPrice: string = e.target.value;
        //console.log(newPrice);

        if( 
            (newPrice.match(/([0-9]+,?)+\.\d\d\d/g))
        ){
            newPrice = price;
            e.target.value = newPrice;
        }

        setPrice(newPrice);
    }

    return(
        <>
            {auth ? undefined : <Redirect to="/login"/>}
            {redirectHome ? <Redirect to={redirectLink} /> : undefined}

            <Container component="main" maxWidth="md">
                <CssBaseline />
                <div className={classes.paper}>
                    <form onSubmit={createProduct} id="newProduct">

                        <Grid
                        md={12}
                        container
                        spacing={2}
                        >
                            {/************Area de Titulo*************/}
                            <Grid
                            item
                            md={12}
                            >
                                <Typography
                                variant="h4"
                                className={classes.dividerFullWidth}
                                >
                                    Agrega un Nuevo Producto
                                </Typography>
                                <Divider className={classes.divider}/>
                            </Grid>

                            <Grid item md={12}>
                                {formErr? showError(): undefined}
                            </Grid>

                            {/************Area de Input*************/}
                            <Grid
                            item
                            md={12}
                            >
                                <div
                                style={{
                                    width: "100%",
                                    //marginRight: 50
                                }}
                                >
                                    <Grid container md={12} spacing={6} style={{
                                        marginBottom: 10
                                    }}>
                                        
                                        <Grid
                                        item
                                        md={6}
                                        >
                                            <div
                                            style={{
                                                maxWidth: "100%",
                                                height: "70%",
                                                border: "2px solid #455D7A",
                                                borderRadius: 5
                                            }}
                                            >
                                               {productImage === null ? showNoPreview(): showPreview()} 
                                            </div>
                                            {/*<Typography variant="button">
                                                    *Máximo 6 Imagenes
                                                </Typography>*/}
                                            <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginTop: 15,
                                                
                                            }}
                                            >
                                                <input
                                                accept="image/*"
                                                className={classes.input}
                                                id="subir_imagen"
                                                multiple={false}
                                                type="file"
                                                onChange={handleImageUpload}
                                                />
                                                <label htmlFor="subir_imagen">
                                                    <Button variant="contained" color="primary" component="span">
                                                    Upload
                                                    </Button>
                                                </label>
                                            </div>
                                        </Grid>

                                        <Grid
                                        item
                                        md={6}
                                        >
                                            <div>
                                                <TextField
                                                id="product_name"
                                                fullWidth
                                                label="Nombre del Producto"
                                                required
                                                variant={"outlined"}
                                                className={classes.inputs}
                                                />
                                                <TextField
                                                id="product_desc"
                                                fullWidth
                                                label="Descripción del Producto"
                                                required
                                                multiline
                                                rows={4}
                                                variant={"outlined"}
                                                className={classes.inputs}
                                                />
                                                <div>
                                                    <TextField
                                                    id="select_category"
                                                    label="Categoria"
                                                    select
                                                    required
                                                    variant={"outlined"}
                                                    className={classes.inputs}
                                                    SelectProps={{
                                                        native: true,
                                                      }}
                                                    helperText="Seleccione una categoria"
                                                    >
                                                        {categories.map((categoria)=>{
                                                            return(
                                                                <option key={categoria.id} value={categoria.id}>
                                                                    {categoria.Nombre}
                                                                </option>
                                                            )
                                                        })}
                                                    </TextField>
                                                    <TextField
                                                    id="product_price"
                                                    label="Precio"
                                                    //type="number"
                                                    required
                                                    onChange={handlePrice}
                                                    placeholder={"0.00"}
                                                    value={price}
                                                    //error
                                                    helperText={"Ingrese números"}
                                                    variant={"outlined"}
                                                    style={{
                                                        maxWidth: "22ch"
                                                    }}
                                                    className={classes.inputs}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">LPS.</InputAdornment>,
                                                      }}
                                                    />
                                                </div>
                                                <div>
                                                <TextField
                                                    id="select_department"
                                                    label="Departamento"
                                                    select
                                                    required
                                                    onChange={changeDepartment}
                                                    variant={"outlined"}
                                                    className={classes.inputs}
                                                    SelectProps={{
                                                        native: true,
                                                      }}
                                                    helperText="Seleccione un Departamento"
                                                    >
                                                        {departments.map((departamento: Department)=>{
                                                            return(
                                                                <option key={departamento.id} value={departamento.id}>
                                                                    {departamento.Nombre}
                                                                </option>
                                                            )
                                                        })}
                                                    </TextField>
                                                    <TextField
                                                    id="select_municipality"
                                                    label="Municipio"
                                                    select
                                                    required
                                                    variant={"outlined"}
                                                    className={classes.inputs}
                                                    SelectProps={{
                                                        native: true,
                                                      }}
                                                    helperText="Seleccione un Municipio"
                                                    >
                                                        {municipalities.map((mun: Municipality)=>{
                                                            return(
                                                                <option key={mun.id} value={mun.id}>
                                                                    {mun.Nombre}
                                                                </option>
                                                            )
                                                        })}
                                                    </TextField>
                                                </div>
                                                <div>
                                                    <TextField
                                                    id="select_state"
                                                    label="Estado del Producto"
                                                    select
                                                    required
                                                    variant={"outlined"}
                                                    className={classes.inputs}
                                                    SelectProps={{
                                                        native: true,
                                                      }}
                                                    helperText="Seleccione un estado."
                                                    >
                                                        <option key={0} value={0}>Nuevo</option>
                                                        <option key={1} value={1}>Usado</option>
                                                    </TextField>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                    
                            {/************Area de Bótones*************/}
                            <Grid
                            item
                            md={12}
                            >
                                <div className={classes.grid_item}>
                                    <Button
                                    onClick={cancelProduct}
                                    variant="contained"
                                    color="primary"
                                    className={classes.cancelar}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.aceptar}
                                    >
                                        Aceptar
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    );
}

export default NewProduct;