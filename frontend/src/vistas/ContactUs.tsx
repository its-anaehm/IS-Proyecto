import { CssBaseline } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import "./ContactUs.css";
import React, {useState} from 'react';
import { Formik, Field, ErrorMessage } from 'formik';

const useStyles = makeStyles((theme) => ({
    paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    }
}));

function ContactUs(){
    const classes = useStyles();
    const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
    return(
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <h2>
                        Compartenos tu información para poder contactarte
                    </h2>
                </div>
            </Container>
            <Formik

                initialValues={{
					nombre: '',
					correo: ''
				}}

                validate={(Values) => {
					let errores = { nombre:'', correo:'' };
					// Validacion nombre
					if(!Values.nombre){
						errores.nombre = 'Por favor ingresa un nombre'
					} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(Values.nombre)){
						errores.nombre = 'El nombre solo puede contener letras y espacios'
					}

					// Validacion correo
					if(!Values.correo){
						errores.correo = 'Por favor ingresa un correo electronico'
					} else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(Values.correo)){
						errores.correo = 'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.'
					}

					return errores;
				}}
				onSubmit={(valores, {resetForm}) => {
					resetForm();
					console.log('Formulario enviado');
					cambiarFormularioEnviado(true);
					setTimeout(() => cambiarFormularioEnviado(false), 5000);
				}}
			>
				{( {errors} ) => (
                    <form className="formulario">
                    <div>
                        <label htmlFor="Nombre">Nombre</label>
                        <Field
							type="text" 
							id="nombre" 
							name="nombre" 
							placeholder="John Jones"
						/>
                        <ErrorMessage name="nombre" component={() => (<div className="error"> {errors.nombre}</div>)} />
                    </div>
                    <div>
                        <label htmlFor="correo">Correo</label>
							<Field
								type="text" 
								id="correo" 
								name="correo" 
								placeholder="correo@correo.com" 
							/>
						<ErrorMessage name="correo" component={() => (<div className="error">{errors.correo}</div>)} />
                    </div>
                    <div>
                        <label htmlFor="correo">Departamento</label>
						<select className="Seleccion">
							<option value="Atlántida">Atlántida</option>
							<option value="Colón">Colón</option>
							<option value="Comayagua">Comayagua</option>
                            <option value="Copán">Copán</option>
							<option value="Cortés">Cortés</option>
							<option value="Choluteca">Choluteca</option>
                            <option value="El Paraíso">El Paraíso</option>
							<option value="Francisco Morazán">Francisco Morazán</option>
							<option value="Gracias a Dios">Gracias a Dios</option>
                            <option value="Intibucá">Intibucá</option>
							<option value="Islas de la Bahía">Islas de la Bahía</option>
							<option value="La Paz">La Paz</option>
                            <option value="Lempira">Lempira</option>
							<option value="Ocotepeque">Ocotepeque</option>
							<option value="Olancho">Olancho</option>
                            <option value="Santa Bárbara">Santa Bárbara</option>
							<option value="Valle">Valle</option>
							<option value="Yoro">Yoro</option>
						</select>
					</div>
                    <div>
                        <label htmlFor="correo">Mensaje</label>
						<Field name="mensaje" as="textarea" placeholder="Mensaje" />
					</div>
                    <button type="submit">Enviar</button>
                    {formularioEnviado && <p className="exito">Formulario enviado con exito!</p>}
                </form>
                )}
            </Formik>
        </>
    );
}

export default ContactUs;