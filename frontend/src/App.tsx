import Login from './vistas/Login';
import Register from './vistas/Register';
import LandingPage from './vistas/LandingPage';
import './css/index.css';
import {
  Switch,
  Route
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Shadows } from "@material-ui/core/styles/shadows";

const defaultTheme = createMuiTheme({
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
      primary: '#455D7A'
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

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <main>
        <Switch>
          <Route exact path="/">
            <LandingPage/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
        </Switch>
      </main>    
    </ThemeProvider>
  );
}

export default App;
