import { Button } from "@material-ui/core";
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
      }
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
    popperWrapper:{
      backgroundColor: "darkgray",
      //backgroundColor: theme.palette.primary.main,
      borderRadius: 15,
      padding: 7,
      paddingRight: 20
      //width: window.innerWidth*0.20
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

function valuetext(value: number) {
  return `${value}`;
}

interface FilterProps{
  setProducts: (productos: ProductObj[])=>void
}

function Filter({
  setProducts
}:FilterProps){
  const classes = useStyles();
  //const [showing, setShowing] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [categories, setCategories] = useState<CategoryObj[]>(templateCategories);
  const [departments, setDepartments] = useState<Department[]>(templateDepartment);
  const [municipalities, setMunicipalities] = useState<Municipality[]>(templateMunicipality);
  const [value, setValue] = useState<number[]>([0, 10000]);

  function placeIcon(){
    if(anchorEl){
      return <ClearIcon fontSize="large" />
    }else{
      return <FilterListIcon fontSize="large" />;
    }
  }

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

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

/**
 * Método que obtiene los parámetros de filtro y realiza la filtración de acuerdo a lo establecido.
 * @param e Evento del formulario
 */
function getProductsWithFilter(e: React.FocusEvent<HTMLFormElement>){
    e.preventDefault();

    /**
     * Para obtener el valor del textfield/input:
     *     e.target."id_input".value
     * 
     * Falta:
     * - Realizar conexón con el backend
     * 
     * - Agregar input si en orden ascendiente
     * o descendiente. 
     * (https://material-ui.com/components/radio-buttons/)
     * 
     * - Si el slider de precios no cumple con lo deseado, utilizar:
     * (https://material-ui.com/components/text-fields/) como type="number"
     * 
     * - Poner un valor por defecto a los Selects para saber si el usuario
     * seleccionó alguna opción del select o no
     * 
     * - Enviar en un formato asi:
     *   {
     *    Department: "",
     *    Municipality: "",
     *    Category: "",
     *    minPrice: "", //precio minimo
     *    maxPrice: "", //precio maximo
     *   }
     * 
     * 
     * - El boton de aplicar envia los datos
     * 
     * - El boton de limpiar limpia todo el filtro y coloca los prodctos por defecto
     * 
     * - Al obtener una respuesta del servidor ( fetch.then( response.json().then() ) ),
     * enviar los productos a la función "setProducts()" la cual ha sido pasada como propiedad del componente
     * 
     * -De encontrarse una lista vacia, mostrar un texto indicando que no sé encontraron
     * productos con el criterio anterior.
     */
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
          <form onSubmit={getProductsWithFilter}>
            <TextField
            id="select_category"
            label="Categoria"
            select
            fullWidth
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
            id="select_department"
            label="Departamento"
            fullWidth
            select
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
            fullWidth
            select
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

            <Typography variant="body1">
              Rango de Precios
            </Typography>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />

            <div className={classes.grid_item}>
                <Button
                //onClick={}
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