import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { Button, CardMedia, Grid, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import ProductObj from '../interfaces/ProductObj';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from '@material-ui/core/Modal';
import Toolbar from '@material-ui/core/Toolbar';

interface CardScrollableProps{
    products: ProductObj[],
    removeFunction: (id: number, param: number)=>void
}

const useStyles = makeStyles((theme)=>({
  cardRoot:{
    width: '100%',
    margin: 4
  },
  pill:{
    width: '90%',
    border: '2px solid',
    borderRadius: 6,
    margin: 5,
    display: 'flex',
    justifyItems: 'center'
  },
  paper: {
    position: 'absolute',
    width: 300,
    height: 100,
    borderRadius: 20,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonYes: {
    margin: theme.spacing(1),
    width: 100,
    backgroundColor: 'lightgray',
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    border: "4px solid",
    borderRadius: 20,
    fontWeight: "bold",
    '&:hover':{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.paper,
        }
  },
  buttonNo: {
    margin: theme.spacing(1),
    width: 100,
    backgroundColor: 'lightgray',
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    border: "4px solid",
    borderRadius: 20,
    fontWeight: "bold",
    '&:hover':{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.paper,
        }
  },
}));

function CardScrollable({
  products,
  removeFunction
}:CardScrollableProps){
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [id, setId] = useState(0);

  const handleOpen = (Productid: any = 0) => {
    setId(Productid);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">¿Vendió el Producto?</h2>
      <Toolbar >
        <button className={classes.buttonYes}
        onClick={ ()=>{
          removeProduct(id,1);
        } }
        >
                Si
        </button>
        <button className={classes.buttonNo}
        onClick={ ()=>{
          removeProduct(id,0);
        } }
        >
                No
        </button>
      </Toolbar>
    </div>
  );

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 40 + rand();
    const left = 55 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  function removeProduct(productID: number, param: number){
    removeFunction(productID, param);
  }


  return(
    <div>
      <Grid
      container
      >
        { products.map( (product: ProductObj) => {
          return(
            <Grid
            item
            className={classes.pill}
            >
              <div
              style={{
                width: '80%',
                padding: 3,
                marginBottom: 4
              }}
              >
                <Typography>
                  {product.name}
                </Typography>
                <Typography>
                  <em>{product.date}</em>
                </Typography>
              </div>
              <Button
              type="button"
              color="primary"
              onClick={ ()=>{
                handleOpen(product.id);
              } }
              >
                <CancelIcon/>
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {body}
            </Modal>
            </Grid>
          )
        }) }
      </Grid>
    </div>
  );
}

export default CardScrollable;