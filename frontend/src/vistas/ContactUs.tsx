import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  }));

function ContactUs(){
    const classes = useStyles();

    return(
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <h2>
                        Vista de "Contacto".
                    </h2>
                </div>
            </Container>
        </>
    );
}

export default ContactUs;