import { CssBaseline, Grid, Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from "../componentes/sidebar/sidebar";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import { useState } from "react";
import "./Settings.css";
import CategoryList from "../componentes/Listas/Categorias";
import ProductsList from "../componentes/Listas/Productos";
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
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
    inputs:{
        margin: theme.spacing(1)
    },
    title: {
        fontFamily: "'Arimo', sans-serif",
        flexGrow: 1,
        textDecoration: 'none'
      },
      input: {
        display: 'none',
        width: '20px'
      }
  }));

function Setting(){
    const classes = useStyles();
    const [currentView, setCurrentView] = useState<string| null>("PRODUCTS");
    const [categoryImage, setCategoryImage] = useState<File|null>(null);
    const [errMessage, setErrMessage] = useState<string>("");
    const [formErr, setFormErr] = useState<boolean>(false);

    function changeView(e: React.MouseEvent<HTMLElement>, view: string | null){
        setCurrentView(view);
    }

    function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.files !== null){

            setCategoryImage(e.target.files[0]);
            
        }}

        function showNoPreview(){
            return(
                <Typography variant="h6" style={{justifyItems:'center', width: '140px', height: '100%'}}>
                    Sin imagen.
                </Typography>
            );
        }
    
        function showPreview(){
            return(
                <Card>
                    <CardContent>
                        <Typography variant="h5">
                            Imagen
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

        function quitarImagen(){
            setCategoryImage(null);
        }

    function CreateCategory(e: React.FocusEvent<HTMLFormElement>){

        e.preventDefault();

        let requestURL: string = 'http://localhost:4000/category/addCategory';

        const formData: FormData = new FormData();

        if(categoryImage == null){
            setFormErr(true);

            setErrMessage("Es necesario que suba una imagen del producto.");
        }else{
            setFormErr(false);
            formData.append('Nombre', e.target.category_name.value);
            formData.append('categoryImage', categoryImage as Blob );

            console.log(formData);

            fetch(requestURL, {
                method: 'POST',
                headers: {
                    'Accept': 'multipart/form-data',
                    'Authorization':`${localStorage.getItem("USR_TKN")}`
                },
                body: formData
              }).then(response => {
                  console.log("Entre: "+response.status)
                  if( response.status >= 400){
                      setErrMessage("");
                      setFormErr(true);
                  }else{
                      //console.log(response);
                      response.json().then(jsonResponse => {
                            console.log(jsonResponse);
                            e.target.category_name.value = "";
                            quitarImagen();
                      });
                  }
              }).catch(error => {
                  setErrMessage("");
                  setFormErr(true);
              });
        }
    }

    return(
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <h2>
                        Configuración
                    </h2>
                </div>
            </Container>
            <div className="container">
                <Sidebar/>
                <div className="ListConteiner">
                    <Grid
                    container
                    >
                        <Grid
                        item
                        style={{
                            justifyItems: 'center',
                            justifyContent: 'center'
                        }}
                        >
                            <ToggleButtonGroup
                            value={currentView}
                            exclusive
                            onChange={changeView}
                            aria-label="view-toggle"
                            >
                                <ToggleButton value={"PRODUCTS"}>
                                    <Typography variant="button">
                                        Productos
                                    </Typography>
                                </ToggleButton>
                                <ToggleButton value={"CATEGORIES"}>
                                    <Typography variant="button">
                                        Categorias
                                    </Typography>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid
                        item
                        lg={12}
                        md={12}
                        >
                            {currentView==="PRODUCTS"? <> 
                            <Typography>
                                <ProductsList/>
                            </Typography>
                            </> : <>
                            <Typography>
                                <div
                                style={{width: "60%"}}
                                >
                                <form onSubmit={CreateCategory} id="NewCategory">
                                    <Toolbar>
                                    <TextField
                                        id="category_name"
                                        fullWidth
                                        label="Nueva Categoría"
                                        required
                                        multiline
                                        rows={1}
                                        variant={"standard"}
                                        className={classes.inputs}
                                        />
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
                                            <Button 
                                            variant="contained" 
                                            color="primary" 
                                            component="span"
                                            style={{width: "140px", display: "flex", alignItems: "center"}}>
                                            Subir Imagen
                                            </Button>
                                        </label>
                                        <div
                                        style={{
                                            maxWidth: "100%",
                                            height: "70%",
                                            border: "2px solid #455D7A",
                                            borderRadius: 5,
                                            paddingLeft: 10
                                        }}
                                        >
                                            {categoryImage === null ? showNoPreview(): showPreview()} 
                                        </div>
                                    </div>
                                        <button 
                                        className="buttom" 
                                        type= "submit"
                                        style={{backgroundColor: "transparent",
                                        display: "flex",
                                        alignItems: "center"
                                        }}
                                        >
                                            <AddCircleOutlineIcon/>
                                        </button>
                                    </Toolbar>
                                </form>
                                </div>
                                <CategoryList/>
                            </Typography></>}
                        </Grid>
                    </Grid>
                </div>
            </div>
            
        </>
    );
}

export default Setting;