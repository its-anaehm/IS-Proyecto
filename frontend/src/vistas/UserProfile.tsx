import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "material-ui/styles/typography";
import { useState } from "react";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  }));

function UserProfile(){
    const classes = useStyles();

    return(
        <>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <h2>
                        Vista de "Usuario".
                    </h2>
                </div>
            </Container>
        </>
    );
}

export default UserProfile;