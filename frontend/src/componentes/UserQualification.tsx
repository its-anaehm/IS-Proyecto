import CommentObj from "../interfaces/CommentObj";
import { Button, Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Rating, { IconContainerProps } from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';
import { useState } from "react";


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


interface UserQualificationProps{
  comments: CommentObj[] | [],
  getUserScore: ()=>void,
  qualifiedUser: number
}

function UserQualification({
  comments,
  getUserScore,
  qualifiedUser
}:UserQualificationProps){
  const classes = useStyles();
  const [qualification, setQualification] = useState<number>(0);
  
  function postComment(e: React.FocusEvent<HTMLFormElement>){
    e.preventDefault();

    let data = {
      "qualifiedUser": qualifiedUser,
      "qualification": qualification,
      "comment": `${e.target.comment_content.value}`
    }

    //console.log("corrio aqui");
    fetch('http://localhost:4000/qualification/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${localStorage.getItem("USR_TKN")}`
      },
      body: JSON.stringify(data)
    }).then( response => {
      if(response.status < 400){
        //Si todo sale bien, se actualizan los comentarios del usuario
        e.target.comment_content.value = "";
        getUserScore();
      }
    } ).catch(error => console.log(error));

  }

  return(
    <div>
      <div
      style={{
        paddingBottom: 15,
        width: '100%'
      }}
      >
        <Box
        component="fieldset"
        mb={3}
        borderColor="transparent"
        style={{
          display: 'grid',
          justifyItems: 'center'
        }}
        >
          <Rating
            name="customized-empty"
            defaultValue={qualification}
            precision={0.5}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            onChange={(event, newValue) => {
              setQualification(parseFloat(`${newValue}`));
            }}
          />
        </Box>
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
          multiline
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
          {comments !== undefined && comments.map( (comment)=>(
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
                  <strong>Anónimo</strong>
                </Typography>
                <Typography>
                  {comment.comment}
                </Typography>
              </div>
            </Grid>
          ) )}
        </Grid>
      </div>
    </div>
  );
}


export default UserQualification;