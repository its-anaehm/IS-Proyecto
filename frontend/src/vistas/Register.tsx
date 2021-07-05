import { Link as LinkRoute } from 'react-router-dom';

function Register() {
    const requestURL: string = 'http://localhost:4000/users/register';

  return (
      <div>
          Hola mundo
          <br></br>
          <LinkRoute to="/login">{"Ingresa aquí"}</LinkRoute>
          <br></br>
          <br></br>
          <LinkRoute to="/">{"Volver a casa"}</LinkRoute>
      </div>
  );
}

export default Register;