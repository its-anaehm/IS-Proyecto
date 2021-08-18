import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from "../componentes/sidebar/sidebar";
import ProductState from "../componentes/Listas/ProductState";

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  }));

function Advertisements(){
    const classes = useStyles();

    return(
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <h2>
                        Productos
                    </h2>
                </div>
            </Container>
            <div className="container">
                <Sidebar/>
                <ProductState />
            </div>
        </>
    );
}

export default Advertisements;