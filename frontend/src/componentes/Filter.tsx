import { Button, FormControl } from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ClearIcon from '@material-ui/icons/Clear';
import { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Municipality from "../interfaces/Municipality";
import Department from "../interfaces/Department";
import CategoryObj from "../interfaces/CategoryObj";
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import ProductObj from "../interfaces/ProductObj";
import { Input } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    boton:{
      margin: 5,
      position: 'fixed',
      left: 10,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      '&:hover':{
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main
      },
      //marginBottom: 10
    },
    paper: {
      border: '1px solid',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
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
    },
    grid_item:{
      width: "100%",
      display: "flex",
      justifyContent: "center"
    }
})
);

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
interface FilterProps{
  setProducts: (productos: ProductObj[])=>void,
  setCurrentPage: (currentPage: number)=>void,
  currentPage: number,
  setAllProducts: (productos: ProductObj[])=>void,
  getProductsOnPage: (cur_page: number) => ProductObj[],
  filterMode: boolean,
  setFilterMode: (mode:boolean)=>void
}

function Filter({
  setProducts,
  setCurrentPage,
  currentPage,
  setAllProducts,
  getProductsOnPage,
  filterMode,
  setFilterMode
}:FilterProps){
  const classes = useStyles();
  //const [showing, setShowing] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [categories, setCategories] = useState<CategoryObj[]>(templateCategories);
  const [departments, setDepartments] = useState<Department[]>(templateDepartment);
  const [municipalities, setMunicipalities] = useState<Municipality[]>(templateMunicipality);
  const [value, setValue] = useState<string>('ASC');

  function changeOrder (event: React.ChangeEvent<HTMLInputElement>){
    setValue((event.target as HTMLInputElement).value);
  }

  function placeIcon(){
    if(anchorEl){
      return <ClearIcon fontSize="large" />
    }else{
      return <FilterListIcon fontSize="large" />;
    }
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
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  function getCategories(){
    fetch("http://localhost:4000/category/categoryConfig", {
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

                jsonResponse.message.map( (cat:CategoryObj) => {
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
            //console.log(jsonResponse);
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

  useEffect(() => {
    getCategories();
    getDepartments();
    getMunicipalities(1);
}, [])

  return(
    <div>
      <Fab className={classes.boton} onClick={handleClick}>
        {placeIcon()}
      </Fab>
      <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement={'bottom'}
      style={{
        width: window.innerWidth*0.20
      }}
      >
        <div
        className={classes.popperWrapper}
        >
          {/*<form>
            <TextField
            id="search"
            label="Buscar"
            variant={"outlined"}
            className={classes.inputs}
            />
            
          </form>*/}
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
      </Popper>
    </div>
  );
}

export default Filter;