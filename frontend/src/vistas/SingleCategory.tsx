import { useParams } from 'react-router-dom';
import ParamInterface from '../interfaces/ParamInterface';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    main:{
        marginLeft: "5%",
        marginRight: "15%"
    }
  }));


function SingleCategory(){
    const classes = useStyles();
    let { id } = useParams<ParamInterface>();

    return(
        <>
            <Container component="main" maxWidth="lg" className={classes.main}>
            <CssBaseline />
                <div className={classes.paper}>
                    <h2>
                        Categoria: {`${id}`}
                    </h2>
                </div>
            </Container>
        </>
    );
}

export default SingleCategory;