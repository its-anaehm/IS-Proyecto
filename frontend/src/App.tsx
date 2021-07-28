import Login from './vistas/Login';
import Register from './vistas/Register';
import LandingPage from './vistas/LandingPage';
import './css/index.css';
import {
  Switch,
  Route
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@material-ui/core';
import { Shadows } from "@material-ui/core/styles/shadows";
import NewProduct from './vistas/NewProduct';
import AboutUs from './vistas/AboutUs';
import ContactUs from './vistas/ContactUs';
import Catalogue from './vistas/Catalogue';
import UserProfile from './vistas/UserProfile';
import Navbar from './componentes/Navbar';
import { useEffect, useState } from 'react';
import UserObj from './interfaces/UserObj';
import SingleCategory from './vistas/SingleCategory';
import SingleProduct from './vistas/SingleProduct';
import CategoryObj from './interfaces/CategoryObj';

let templateCategories: CategoryObj[] = [{
  id: 0,
  Nombre: "Categoria",
  Imagen: "",
  Num_Visita: 0
}];

const defaultTheme = createTheme({
  palette: {
    primary:{
      main: '#455D7A'
    },
    secondary:{
      main: '#F95959'
    },
    background:{
      paper: '#E3E3E3',
      default: '#E3E3E3'
    },
    text:{
      primary: '#455D7A',
      secondary: '#455D7A'
    }
  },
  shape:{
    borderRadius: 8
  },
  typography:{
    button:{
      fontFamily: "'Arimo', sans-serif"
    },
    h1:{
      fontWeight: "bold"
    }
  },
  shadows: Array(25).fill("none") as Shadows,
});

let userPlaceholder: UserObj = {
  ID: 0,
  Nombre: "nombre",
  Apellido: "apellido",
  Email: "email",
  Telefono: "telefono"
}

function App() {
  const [categories, setCategories] = useState<CategoryObj[] | []>(templateCategories);

  //const requestURL:string = "http://localhost:4000/users/my_details";

  //Estado para saber si se encuentra un usuario logueado
  const [auth, setAuth] = useState<boolean>(()=>{
    if(localStorage.getItem("USR_TKN") !== null){
      return true;
    }else{
      return false;
    }
  });

  //Estado del usuario actual
  const [currentUser, setCurrentUser] = useState<UserObj>(()=>{
    if(localStorage.getItem("USR") !== null){
      return (JSON.parse(`${localStorage.getItem("USR")}`));
    }else{
      return userPlaceholder;
    }
  });


  //JUAN
  function getCategories(){
    fetch('http://localhost:4000/category/ ',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }
    ).then( response => {
      if(response.status < 400){
        response.json().then(jsonResponse => {
          setCategories(jsonResponse.category)
        })
      }
    } ).catch(e=>{
      console.log(e);
    });
  }
 
  useEffect(() => {
    getCategories();
  }, []);

  //JUAN


  return (
    <ThemeProvider theme={defaultTheme}>
      <main>
        <Switch>
          <Route exact path="/">
            <LandingPage auth={auth} currentUser={currentUser}/>
          </Route>
          <Route path="/login">
            <Login auth={auth} setAuth={setAuth} setCurrentUser={setCurrentUser} />
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/add-product">
            <NewProduct auth={auth}/>
          </Route>
          <Route path="/about-us">
            <AboutUs/>
          </Route>
          <Route path="/contact-us">
            <ContactUs/>
          </Route>
          <Route path="/catalogue">
            <Catalogue categories={categories}/>
          </Route>
          <Route path="/user-profile">
            <UserProfile auth={auth} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
          </Route>
          <Route path="/categories/:id" children={<SingleCategory auth={auth}/>} />
          <Route path="/products/:id" children={<SingleProduct auth={auth} categories={categories} currentUser={currentUser}/>} />
        </Switch>
        <Navbar auth={auth} setAuth={setAuth} currentUser={currentUser} />
      </main>    
    </ThemeProvider>
  );
}

export default App;
