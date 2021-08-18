import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from "../componentes/sidebar/sidebar";
import ComplaintList from "../componentes/Listas/ComplaintList"

const useStyles = makeStyles((theme) => ({
    paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    }
}));

function Complaint(){
    const classes = useStyles();

    return(
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <h2>
                        Denuncias
                    </h2>
                </div>
            </Container>
            <div className="container">
                <Sidebar/>
                <ComplaintList/>
            </div>
        </>
    );
}

export default Complaint;