import { CssBaseline, Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import Categories from "../componentes/Categories";
import Products from "../componentes/Products";
import CategoryObj from "../interfaces/CategoryObj";

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: window.innerWidth*0.80,
      marginLeft: (window.innerWidth-(window.innerWidth*0.80))/2
    }
  }));

interface CatalogueProps{
    categories: CategoryObj[],
    getCategories: ()=>void
}

function Catalogue({
    categories,
    getCategories
}:CatalogueProps){
    const classes = useStyles();
    const [currentView, setCurrentView] = useState<string| null>("PRODUCTS");

    function changeView(e: React.MouseEvent<HTMLElement>, view: string | null){
        setCurrentView(view);
    }

    useEffect(() => {
		getCategories();
	}, [])

    return(
        <>
            <Container component="main">
                <CssBaseline />
                <div className={classes.paper}>
                    <Grid
                    container
                    lg={12}
                    md={12}
                    style={{
                        maxWidth: '100%'
                    }}
                    >
                        <Grid
                        item
                        lg={12}
                        md={12}
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
                            {currentView==="PRODUCTS"? <Products/> : <Categories categories={categories}/>}
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    );
}

export default Catalogue;