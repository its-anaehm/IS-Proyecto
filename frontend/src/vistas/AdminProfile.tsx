import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import UserObj from "../interfaces/UserObj";
import Sidebar from "../componentes/sidebar/sidebar";
import AdminView from "../componentes/AdminView/AdminView";
import "./AdminP.css";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    }
}));

interface UserProfileProps{
    auth: boolean,
    currentUser: UserObj,
    setCurrentUser: (user: UserObj)=>void,
    isAdmin: boolean
}

function AdminProfile(props: UserProfileProps){
    const classes = useStyles();
    
    return(
        <>
            {!props.isAdmin ? <Redirect to="/"/> : undefined}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <h2>
                        Bienvenido Administrador.
                    </h2>
                </div>
            </Container>
            <div className="container">
                <Sidebar/>
                <AdminView/>
            </div>
        </>
    );
}

export default AdminProfile;