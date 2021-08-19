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
import { FormLabel } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { Button, FormControl } from "@material-ui/core";
import Municipality from "../interfaces/Municipality";
import Department from "../interfaces/Department";
import UserInfo from './UserInfo';
import ProductGrid from "./ProductGrid";

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
        height: 212
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
    },
    inputs:{
        margin: theme.spacing(1),
    },
    aceptar: {
        //width: "30%",
        margin: theme.spacing(1),
        backgroundColor: "darkgray",
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        border: "4px solid",
        fontWeight: "bold",
        '&:hover':{
            backgroundColor: theme.palette.secondary.main,
            color: "darkgray",
            }
    },
    popperWrapper:{
        backgroundColor: "darkgray",
        //backgroundColor: theme.palette.primary.main,
        borderRadius: 15,
        padding: 7,
        paddingRight: 20,
        marginRight: 15
        //marginTop: 170
        //width: window.innerWidth*0.20
    },
    cancelar: {
          //width: "30%",
        margin: theme.spacing(1),
        backgroundColor: "darkgray",
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        border: "4px solid",
        fontWeight: "bold",
        '&:hover':{
        backgroundColor: theme.palette.primary.main,
            color: "darkgray",
        }
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

let templateDepartment: Department[] = [{
    id: 0,
    Nombre: "Departamento"
  }];
  
  let templateMunicipality: Municipality[] = [{
    id: 0,
    Nombre: "Departamento"
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
    const [categories, setCategories] = useState<CategoryObj[]>(templateCategories);
    const [departments, setDepartments] = useState<Department[]>(templateDepartment);
    const [municipalities, setMunicipalities] = useState<Municipality[]>(templateMunicipality);
    const [value, setValue] = useState<string>('ASC');
    const [products, setProducts] = useState<ProductObj[]>(templateProducts);
    const [showGrid, setShowGrid] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filterMode, setFilterMode] = useState<boolean>(false);
    const [allProducts, setAllProducts] = useState<ProductObj[]>(templateProducts);

    function changeOrder (event: React.ChangeEvent<HTMLInputElement>){
        setValue((event.target as HTMLInputElement).value);
      }

      function getProductsFromPages(page: number){
        if(filterMode){
            setProducts(getProductsOnPage(page));
        }else{
            fetch(`http://localhost:4000/products/page=${page}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
            ).then( response => {
                if(response.status < 400){
                    response.json().then(jsonResponse => {
                        //console.log(jsonResponse)
                        setProducts(jsonResponse.message);
                        })
                    }
                } ).catch(e=>{
                    console.log(e);
            });
        }
        
      }

    function getProductsOnPage(page_curr: number): ProductObj[]{
        let result: ProductObj[];
        let min: number = (page_curr*10)-10;
        let max: number = (page_curr*10);

        if(max+1 > allProducts.length){
            result = allProducts.slice(min);
        }else{
            result = allProduct.slice(min,max-1);
        }

        return result;
    }

    function clearForm(e: React.FocusEvent<HTMLFormElement>){
        e.target.select_department.value = 0;
        e.target.select_municipality.value = 0;
        e.target.select_category.value=0;
        e.target.minPrice.value = "";
        e.target.maxPrice.value = "";
        setValue("ASC");
        setFilterMode(false);
        setCurrentPage(1);
        setShowGrid(false);
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
                    
                    let newCategories = [{
                      id: 0,
                      Nombre: "-------"
                    }];
    
                    jsonResponse.category.map( (cat:CategoryObj) => {
                      newCategories.push(cat)
                    })
    
                    setCategories(newCategories)
    
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
    
                    let newDepartments = [{
                      id: 0,
                      Nombre: "-------"
                    }];
    
                    jsonResponse.departments.map( (dep:Department) =>
                      newDepartments.push(dep)
                    )
    
                    setDepartments(newDepartments)
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
    
                    let newMunicipalities = [{
                      id: 0,
                      Nombre: "-------"
                    }];
    
                    jsonResponse.municipalities.map( (num: Municipality) => 
                    newMunicipalities.push(num)
                    ) 
    
                    setMunicipalities(newMunicipalities)
    
                } )
            }
        } ).catch(error => {
            console.log(error);
        });
    
    }
    
    /**
     * Método que obtiene los parámetros de filtro y realiza la filtración de acuerdo a lo establecido.
     * @param e Evento del formulario
     */
    function getProductsWithFilter(e: React.FocusEvent<HTMLFormElement>){
        e.preventDefault();
        setShowGrid(true);
        
        let department = e.target.select_department.value;
        let municipality = e.target.select_municipality.value;
        let category = e.target.select_category.value;
        let minPrice = e.target.minPrice.value;
        let maxPrice = e.target.maxPrice.value;
    
        department = department !== "0"? department : undefined;
        municipality = municipality !== "0"? municipality : undefined;
        category = category !== "0"? category : undefined;
        minPrice = minPrice !== ""? minPrice : undefined;
        maxPrice = maxPrice !== ""? maxPrice : undefined;
    
    
        const filter = {
          Department: department,
          Municipality: municipality,
          Category: category,
          minPrice: minPrice,
          maxPrice: maxPrice,
          order: value
        };

        fetch('http://localhost:4000/filters/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(filter)
          }).then(response => {
            if(response.status < 400){
              response.json().then( jsonResponse => {
                setAllProducts(jsonResponse.message);

                setCurrentPage(1);
                let newProducts: ProductObj[] = getProductsOnPage(currentPage);
                setFilterMode(true);
                setProducts(newProducts);
              });
            }
          }).catch(e=>{
            console.log(e);
          });
    }
    
    function changeDepartment(event: React.ChangeEvent<HTMLInputElement>){
        getMunicipalities(parseInt(`${event.target.value}`));
    }

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




    useEffect(() => {
        getSubscribedCategories();
        getWishlist();
        getCategories();
        getDepartments();
        getMunicipalities(1);
        getProductsFromPages(1);
        //console.log(suscribedCat);
    }, [])

    function showProductGrid(){
        return(
            <Grid
            container
            lg = {9}
            >
                { products.length === 0
                ?
                <Typography style={{paddingTop: '100px', alignContent: 'right'}} variant="h4">Ningún producto coincide con los criterios.</Typography>
                :
                <ProductGrid
                products={products}
                productPages={Math.ceil( (products.length)/10 )}
                currentPage={currentPage}
                changePage={getProductsFromPages}
                /> 
                }
            </Grid>
        );
    }

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
                    <div
                    className={classes.popperWrapper}
                    >
                    <form onSubmit={getProductsWithFilter} onReset={clearForm}>
                        <TextField
                        id="select_category"
                        label="Categoria"
                        select
                        fullWidth
                        size = "small"
                        variant={"outlined"}
                        className={classes.inputs}
                        SelectProps={{
                            native: true,
                        }}
                        //helperText="Seleccione una categoria"
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
                        id="select_department"
                        label="Departamento"
                        fullWidth
                        size = "small"
                        select
                        onChange={changeDepartment}
                        variant={"outlined"}
                        className={classes.inputs}
                        SelectProps={{
                            native: true,
                        }}
                        //helperText="Seleccione un Departamento"
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
                        fullWidth
                        size = "small"
                        select
                        variant={"outlined"}
                        className={classes.inputs}
                        SelectProps={{
                            native: true,
                        }}
                        //helperText="Seleccione un Municipio"
                        >
                            {municipalities.map((mun: Municipality)=>{
                                return(
                                    <option key={mun.id} value={mun.id}>
                                        {mun.Nombre}
                                    </option>
                                )
                            })}
                        </TextField>

                        <Typography variant="body1">
                        Rango de Precios
                        </Typography>

                        <div>

                        <TextField 
                        placeholder = "Mínimo" 
                        id = "minPrice" 
                        type = "number"
                        style = {{
                            display: "inline-flex",
                            width: '14ch'
                        }}
                        className = {classes.inputs}>
                        </TextField>

                        <TextField 
                        placeholder= "Máximo" 
                        id = "maxPrice" 
                        type = "number" 
                        style = {{
                            display: "inline-flex",
                            width: "14ch"
                        }}
                        className = {classes.inputs}>
                        </TextField>
                        </div>

                        {/*<Slider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                        />*/}

                        <FormControl id = "select_order" component="fieldset">
                        <FormLabel component="legend">Orden</FormLabel>
                        <RadioGroup id = "option" value={value} onChange={changeOrder}>
                            <FormControlLabel value="ASC" control={<Radio />} label="Asc"/>
                            <FormControlLabel value="DESC" control={<Radio />} label="Desc"/>
                        </RadioGroup>
                        </FormControl>

                        <div className={classes.grid_item}>
                            <Button
                            //onClick={clearForm}
                            type="reset"
                            variant="contained"
                            color="primary"
                            className={classes.cancelar}
                            >
                                Limpiar
                            </Button>
                            <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.aceptar}
                            >
                                Aplicar
                            </Button>
                        </div>
                    </form>
                    </div>
                </Grid>
                
                {showGrid? showProductGrid(): <UserInfo suscribedCat={suscribedCat} wishlist={wishlist}/>}

            </Grid>
        </Grid>
        </>
    );
}

export default UserHome;