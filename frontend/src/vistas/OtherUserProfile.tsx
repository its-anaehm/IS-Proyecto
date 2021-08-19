import { CssBaseline, Grid, TextField } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import UserObj from "../interfaces/UserObj";
import usrImg from "../img/user.png";
import Button from "@material-ui/core/Button";
import { useParams } from 'react-router-dom';
import ParamInterface from '../interfaces/ParamInterface';
//import { CommentSharp, Person, Visibility } from "@material-ui/icons";
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
//import Box from '@material-ui/core/Box';
import UserQualification from "../componentes/UserQualification";
import CommentObj from "../interfaces/CommentObj";
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyItems: 'center'
    },
    colorClass:{
        color: '#233142',
        fontWeight: 'bold'
    },
    card:{
			maxWidth: 500,
			height: '90%',
			position: 'absolute',
			display: 'block',
			overflow: 'scroll',
			top: '5%'
	  },
		submit: {
      //width: "30%",
      margin: theme.spacing(1, 0, 2),
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
    inputs:{
        margin: theme.spacing(1)
    },
    desestimar: {
        //width: "30%",
        margin: theme.spacing(1),
        backgroundColor: '#e3e3e3',
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
        border: "4px solid",
        fontWeight: "bold",
        '&:hover':{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.background.paper,
            }
    },
    aprobar: {
        //width: "30%",
        margin: theme.spacing(1),
        backgroundColor: 'lightgray',
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        border: "4px solid",
        fontWeight: "bold",
        '&:hover':{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.paper,
            }
    },

  }));

interface UserProfileProps{
    auth: boolean,
		currentUser: UserObj
}

let userPlaceholder: UserObj = {
	ID: 0,
	Nombre: "nombre",
	Apellido: "apellido",
	Email: "email",
	Telefono: "telefono"
  };

function OtherUserProfile({
	auth,
	currentUser
}:UserProfileProps){
	const classes = useStyles();
	const { id, motivo } = useParams<ParamInterface>();
	const [user, setUser] = useState<UserObj>(userPlaceholder);
  const rol = localStorage.getItem("USR_R");
	const [qualification, setQualification] = useState<number>(0);
	const [usrComments, setComments] = useState<CommentObj[] | []>([{
    contenido: ""
  }]);
	const [clicked, setClicked] = useState<boolean>(false);
	const [viewModal, setViewModal] = useState<boolean>(false);
	const [reportValue, setReportValue] = useState<string>('0');
	const [noSelection, setNoSelection] = useState<boolean>(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReportValue((event.target as HTMLInputElement).value);
  };

    function Information(){
        fetch(`http://localhost:4000/users/user/${id}`,{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${localStorage.getItem("USR_TKN")}`
        }
        }).then(response => {
        if(response.status < 400){
            response.json().then(jsonResponse => {
            setUser(jsonResponse)
        })
        }
        }).catch(e=>{
            console.log(e);
        });
    }

		function getUserScore(){
			fetch(`http://localhost:4000/qualification/${id}`, {
					method: 'GET',
					headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
							'Authorization': `${localStorage.getItem("USR_TKN")}`
					}
			}).then( response =>{
					if(response.status < 400){
						//console.log(response);
							response.json().then( jsonResponse => {
									console.log(jsonResponse);
									setQualification(parseFloat(`${jsonResponse.qualification.qualification}`));

									//colocar set Comentarios aqui
									//Se obtienen los comentarios de la respuesta json
									
									//let comments = jsonResponse.comments;
									setComments(jsonResponse.comments);
				
							} );
					}
			} ).catch(error => {
					console.log(error);
			});
		}

	useEffect(() => {
        Information();
				getUserScore();
	}, [])

	function reportUser(){
		//Aqui se reporta al usuario en cuestión
		if(reportValue === '0'){
			setNoSelection(true);
			return
		}else{

			setNoSelection(false);

			fetch(`http://localhost:4000/complaints/${currentUser.ID}/${id}/${reportValue}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${localStorage.getItem("USR_TKN")}`
      },
      //body: JSON.stringify(data)
    }).then( response => {
      if(response.status < 400){
        //Si todo sale bien, se cierra la ventana modal y no se le permite volver a denunciar a este usuario
				setClicked(true);
      }
    } ).catch(error => console.log(error));
		}

	}
	
	return(
			<>
					{auth ? undefined : <Redirect to="/"/>}

					<Container component="main" maxWidth="md">
							<CssBaseline />
							<div className={classes.paper}>
								<Grid container lg={12} spacing={3}>
									<Grid item lg={12} className={classes.colorClass}>
									 <div
										style={{
												maxWidth: '100%',
												maxHeight: '100%',
												display: 'flex',
												justifyContent: 'center',
												paddingTop: '2%'
										}}
										>
												<Grid
												container
												md={12}
												justifyContent="center"
												style={{
														justifyItems: 'center',
														display: 'grid'
												}}        
												>
														<Grid
														item
														md={12}
														>
																<img src={usrImg} alt="Icono de usuario." />
														</Grid>
														<Grid
														item
														md={12}
														style={{
															display: 'grid',
															justifyItems: 'center'
														}}
														>
																<Typography
																variant="h4"
																>
																		{`${user.Nombre} ${user.Apellido}`}
																</Typography>
																<Rating
																	name="customized-empty"
																	//defaultValue={qualification}
																	value={qualification}
																	precision={0.5}
																	readOnly
																	emptyIcon={<StarBorderIcon fontSize="inherit" />}
																	style={{
																		alignSelf: 'center'
																	}}
																/>
																<Typography
																variant="h6"
																align="center"
																>
																		{`${user.Email}`}
																</Typography>
																<Typography
																variant="h6"
																align="center"
																>
																		{`${user.Telefono}`}
																</Typography>
														</Grid>
												</Grid>
										</div>
									</Grid>
									<Grid
									item
									lg={12}
									className={classes.colorClass}
									style={{
										justifyItems: 'center',
										display: 'grid'
									}}
									>
										{motivo === "0" &&
											<>
											{
												clicked &&
												<Typography variant="body1">
													Se ha informado de su denuncia y un administrador procesará la misma.
												</Typography>
											}
											<Button 
											type="submit"
											variant="contained"
											color="primary"
											className={classes.desestimar}
											onClick={()=>{
												if(!clicked){
													setViewModal(true);
												}
											}}
											>
												Denunciar
											</Button>
											<Modal
											open={viewModal}
											onClose={()=>{setViewModal(false)}}
											aria-labelledby="simple-modal-title"
												aria-describedby="simple-modal-description"
											>
												{
													<div
													className={classes.paper}
													style={{
														display: 'grid',
														justifyItems: 'center'
													}}
													>
															<Card className={classes.card}>
																	<CardHeader
																	title="Realizar denuncia:"
																	/>
																	<CardContent>
																				{/*
																				1: Actitud Negativa
																				2: Abuso Verbal/Textual
																				3: Estafador
																				4: Información Falsa
																				5: Vendedor menor de 18 años
																				6: Publicación de información de contacto de otro usuario
																				7: No hay intención de completar la venta
																				8: Producto Indebido
																				*/}
																					<FormControl component="fieldset">
																						<FormLabel component="legend">Motivo</FormLabel>
																						<RadioGroup aria-label="reason" name="reason" value={reportValue} onChange={handleChange}>
																							<FormControlLabel value='1' control={<Radio />} label="Actitud Negativa" />
																							<FormControlLabel value="2" control={<Radio />} label="Abuso Verbal/Textual" />
																							<FormControlLabel value="3" control={<Radio />} label="Estafador" />
																							<FormControlLabel value="4" control={<Radio />} label="Información Falsa" />
																							<FormControlLabel value="5" control={<Radio />} label="Vendedor menor de 18 años" />
																							<FormControlLabel value="6" control={<Radio />} label="Publicación de información de contacto de otro usuario" />
																							<FormControlLabel value="7" control={<Radio />} label="No hay intención de completar la venta" />
																							<FormControlLabel value="8" control={<Radio />} label="Producto Indebido" />
																						</RadioGroup>
																					</FormControl>
																					{noSelection && 
																					<Typography color="error" variant="body1">
																						Debe de seleccionar un motivo de denuncia.
																					</Typography>
																					}
																	</CardContent>
																	<CardActions>
																			

																			<Button
																			fullWidth
																			variant="contained"
																			color="primary"
																			className={classes.submit}
																			onClick={reportUser}
																			>
																					Realizar Denuncia
																			</Button>
																	</CardActions>
															</Card>

													</div>
											}
											</Modal>
											</>
										}
										{rol === "Administrador" && (motivo !== "0" &&
										<div className="WidgetUsers">
												<ul className="widgetUserList">
														<li className="widgetUserListItem">
																<div className="widgetUserInfo">
																		<span className="widgetUserDenuncia">{motivo}</span>
																		<div>
																				<Button 
																				type="submit"
																				variant="contained"
																				color="primary"
																				className={classes.aprobar}
																				>
																						Aprobar
																				</Button>
																				<Button 
																				type="submit"
																				variant="contained"
																				color="primary"
																				className={classes.desestimar}
	>
																						Desestimar
																				</Button>
																		</div>
																</div>
														</li>
												</ul>
										</div>)}
									</Grid>
									<Grid item lg={12} className={classes.colorClass}
									style={{
										justifyItems: 'center',
										display: 'grid'
									}}
									>
										<Typography variant="h5">
											Calificar
										</Typography>
										<UserQualification comments={usrComments} getUserScore={getUserScore} qualifiedUser={parseInt(id)}/>
									</Grid>
								</Grid>
							</div>
					</Container>
			</>
	);
}

export default OtherUserProfile;