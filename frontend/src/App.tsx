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
import AdminProfile from './vistas/AdminProfile';
import Statistics from './vistas/Statistics';
import Sales from './vistas/Sales';
import Complaint from './vistas/Complaint';
import Advertisements from './vistas/Advertisements';
import Setting from './vistas/Setting';
import OtherUserProfile from './vistas/OtherUserProfile';
import { SignalCellularConnectedNoInternet0Bar } from '@material-ui/icons';

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

  const [isAdmin, setIsAdmin] = useState<boolean>(()=>{
    if(localStorage.getItem("USR_R") === "Administrador"){
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
    fetch('http://localhost:4000/category/',{
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
            <Login auth={auth} setAuth={setAuth} setCurrentUser={setCurrentUser} setIsAdmin={setIsAdmin} />
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
            <Catalogue categories={categories} getCategories={getCategories}/>
          </Route>
          <Route path="/user-profile">
            <UserProfile auth={auth} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
          </Route>
          <Route path="/other-user-profile/:id/:motivo/:id_denuncia">
            <OtherUserProfile auth={auth} currentUser={currentUser}/>
          </Route>
          <Route path="/admin-profile">
            <AdminProfile auth={auth} currentUser={currentUser} setCurrentUser={setCurrentUser} isAdmin={isAdmin}/>
          </Route>
          <Route path="/Statistics">
            <Statistics isAdmin={isAdmin}/>
          </Route>
          <Route path="/Sales">
            <Sales isAdmin={isAdmin}/>
          </Route>
          <Route path="/complaint">
            <Complaint isAdmin={isAdmin}/>
          </Route>
          <Route path="/Setting">
            <Setting/>
          </Route>
          <Route path="/advertisements">
            <Advertisements />
          </Route>
          <Route path="/categories/:id" children={<SingleCategory auth={auth}/>} />
          <Route path="/products/:id" children={<SingleProduct auth={auth} categories={categories} currentUser={currentUser}/>} />
        </Switch>
        <Navbar auth={auth} setAuth={setAuth} currentUser={currentUser} setIsAdmin={setIsAdmin}/>
      </main>    
    </ThemeProvider>
  );
}

export default App;
