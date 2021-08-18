import { CssBaseline, Grid } from "@material-ui/core";
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


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  }));

function Setting(){
    const classes = useStyles();
    const [currentView, setCurrentView] = useState<string| null>("PRODUCTS");

    function changeView(e: React.MouseEvent<HTMLElement>, view: string | null){
        setCurrentView(view);
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