import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "material-ui/styles/typography";
import AboutInfo from "../componentes/AboutUsInfo/AboutInfo";
import AdminProfile from "./AdminProfile";

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  }));

function AboutUs(){
    const classes = useStyles();

    return(
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                </div>
            </Container>
            <div className="container">
                <AboutInfo/>
            </div>
        </>
    );
}

export default AboutUs;