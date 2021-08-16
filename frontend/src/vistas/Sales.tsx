import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Info from "../componentes/Información/Info";
import Sidebar from "../componentes/sidebar/sidebar";
import Estadisticas from "../componentes/StadisticsWiew/Estadisticas";
import "./Sales.css"

const useStyles = makeStyles((theme) => ({
    paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    }
}));

function Sales(){
    const classes = useStyles();

    return(
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <h2>
                        Ventas
                    </h2>
                </div>
            </Container>
            <div className="container">
                <Sidebar/>
                <div className="SalesView">
                    <Info/>
                    <Estadisticas/>
                </div>
            </div>
        </>
    );
}

export default Sales;