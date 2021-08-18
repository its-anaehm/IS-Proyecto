import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from "../componentes/sidebar/sidebar";
import Estadisticas from "../componentes/StadisticsWiew/Estadisticas";
import StadisticsNewUsers from "../componentes/StadisticsWiew/StadisticsNewUsers";
import StadisticsNewProducts from "../componentes/StadisticsWiew/StadisticsNewProducts";
import "./Stadistics.css";
import StadisticsCategory from "../componentes/StadisticsWiew/StadisticsCategory";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    }
}));

interface StatisticsProps{
    isAdmin: boolean
}

function Statistics(props: StatisticsProps){
    const classes = useStyles();

    return(
        <>
             {!props.isAdmin ? <Redirect to="/"/> : undefined}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <h2>
                        Estadísticas
                    </h2>
                </div>
            </Container>
            <div className="container">
                <Sidebar/>
                <div className="StadisticsView">
                    <div className="InfoWrapper">
                        <div className="infoItem2">
                            <StadisticsNewProducts />
                        </div>
                        <div className="infoItem2">
                            <StadisticsCategory/>
                        </div>
                    </div>
                    <StadisticsNewUsers />
                    <Estadisticas />
                </div>
            </div>
        </>
    );
}

export default Statistics;