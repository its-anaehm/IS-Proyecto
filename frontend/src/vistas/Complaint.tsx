import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from "../componentes/sidebar/sidebar";
import ComplaintList from "../componentes/Listas/ComplaintList"
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    }
}));

interface ComplaintProps{
    isAdmin: boolean
}

function Complaint(props: ComplaintProps){
    const classes = useStyles();

    return(
        <>
            {!props.isAdmin ? <Redirect to="/"/> : undefined}
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