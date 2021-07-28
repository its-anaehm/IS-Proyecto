import CommentObj from "../interfaces/CommentObj";
import { Button, Grid, InputAdornment } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import UserObj from "../interfaces/UserObj";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  aceptar: {
  //width: "30%",
  margin: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.secondary.main,
  borderColor: theme.palette.secondary.main,
  border: "4px solid",
  fontWeight: "bold",
  '&:hover':{
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.background.paper,
      }
  },
  grid_item:{
      width: "100%",
      display: "flex",
      justifyContent: "center"
  },
  inputs:{
      margin: theme.spacing(1)
  },
  input: {
    display: 'none',
  },
  commentArea: {
    margin: 10,
    border: '2px solid',
    borderRadius: 10,
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.primary.main
  }
  
}));


interface CommentSectionProps{
  comments: CommentObj[],
  getComments: ()=>void,
  currentUser: UserObj,
  productID: string
}

function CommentSection({
  comments,
  getComments,
  currentUser,
  productID
}:CommentSectionProps){
  const classes = useStyles();

  
  function postComment(e: React.FocusEvent<HTMLFormElement>){
    e.preventDefault();

    //console.log("corrio aqui");

    fetch(`http://localhost:4000/comments/publish/${currentUser.ID}/${productID}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${localStorage.getItem("USR_TKN")}`
      },
      body: JSON.stringify({"comment": `${e.target.comment_content.value}`})
    }
    ).then(response=>{
      if(response.status<400){
        getComments();
      }
    }).catch(e=>{
      console.log(e);
    });

  }

  return(
    <div>
      <div
      style={{
        paddingBottom: 15,
        width: '100%'
      }}
      >
        <form
        onSubmit={postComment}
        style={{
          paddingBottom: 15,
          display: 'flex',
          justifyItems: 'right',
          width: '100%'
        }}
        >
          <TextField
          id="comment_content"
          fullWidth
          placeholder={"Ingrese su comentario aquí..."}
          variant={"outlined"}
          className={classes.inputs}
          />
          <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.aceptar}
          >
            Comentar
          </Button>
        </form>
      </div>
      <div
      style={{
        paddingBottom: 15,
        display: 'flex',
        justifyItems: 'left',
        width: '100%'
      }}
      >
        <Grid
        container
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
        >
          {comments.map( (comment)=>(
            <Grid
            item
            className={classes.commentArea}
            >
              <div
              style={{
                padding: 20
              }}
              >
                <Typography
                variant="button"
                >
                  <strong>{comment.usuario}</strong>               <em>{comment.fecha}</em>
                </Typography>
                <Typography>
                  {comment.contenido}
                </Typography>
              </div>
            </Grid>
          ) )}
        </Grid>
      </div>
    </div>
  );
}


export default CommentSection;