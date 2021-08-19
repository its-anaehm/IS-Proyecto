import { CssBaseline, Grid, TextField } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import UserObj from "../interfaces/UserObj";
import usrImg from "../img/user.png";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from "@material-ui/core/Button";
import ProductObj from "../interfaces/ProductObj";
import CardScrollable from "../componentes/CardScrollable";
import { Link, useParams } from 'react-router-dom';
import ParamInterface from '../interfaces/ParamInterface';
import { Person, Visibility } from "@material-ui/icons";


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
    cards:{
        width: '100%',
        backgroundColor: 'lightgray',
        borderRadius: 8,
        paddingRight: 7
    },
    inputs:{
        margin: theme.spacing(1)
    },
    desestimar: {
        //width: "30%",
        margin: theme.spacing(1),
        backgroundColor: 'lightgray',
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
    auth: boolean
}

let templateProducts:ProductObj[] =[{
	id:0,
	name: "producto",
	price: "0.00",
	images: ["item-placeholder.png"]
}];

let userPlaceholder: UserObj = {
	ID: 0,
	Nombre: "nombre",
	Apellido: "apellido",
	Email: "email",
	Telefono: "telefono"
  };

interface Published{
	id: number,
	published: string,
	date: string,
	image: string
}

function OtherUserProfile({
	auth
}:UserProfileProps){
	const classes = useStyles();
	const { id } = useParams<ParamInterface>();
	const { motivo } = useParams<ParamInterface>();
	const [showErr, setShowErr] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [errMessage, setErrMessage] = useState<string>("");
	const [publishedProducts, setPublished] = useState<ProductObj[]>(templateProducts);
	const [wishlist, setWishlist] = useState<ProductObj[] | []>(templateProducts);
	const [user, setUser] = useState<UserObj>(userPlaceholder);
    const rol = localStorage.getItem("USR_R")

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

	function updateUserData(e: React.FocusEvent<HTMLFormElement>){
			e.preventDefault();
			let requestURL:string = `http://localhost:4000/users/${user.ID}`;

			if( e.target.phone.value !== "" && !(`${e.target.phone.value}`.match(/\d{4}(\-)?\d{4}/))  ){
					setSuccess(false);
					setErrMessage("El teléfono ingresado no es válido.");
					setShowErr(true);

			}else{
					setErrMessage("");
					setShowErr(false);

					let nombre = e.target.userFName.value;
					let lName = e.target.userLName.value;
					let telefono = e.target.phone.value;

					let data = {
							firstName: nombre === "" ? user.Nombre : nombre,
							lastName: lName==="" ? user.Apellido : lName,
							email: user.Email,
							phone: telefono === "" ? user.Telefono : telefono
					}

					//console.log(data);
					
					fetch(requestURL, {
							method: 'PUT',
							headers: {
									'Content-Type': 'application/json',
									'Accept': 'application/json',
									'Authorization': `${localStorage.getItem("USR_TKN")}`
							},
							body: JSON.stringify(data)
						}).then( response => {
							if(response.status >= 400){
									setSuccess(false);
									setShowErr(true);
							}else{
									setSuccess(true);
									response.json().then((jsonResponse) => {
											let newUser: UserObj = {
													ID: jsonResponse.id,
													Nombre: `${jsonResponse.Nombre}`,
													Apellido: `${jsonResponse.Apellido}`,
													Email: `${jsonResponse.Email}`,
													Telefono: `${jsonResponse.Telefono}`
											};
											setUser(newUser);
											localStorage.setItem("USR", JSON.stringify(newUser));
									});
							}
						} ).catch(error => {
							setSuccess(false);
							setShowErr(true);
						});
			}

			

	}

	
	function getPublishedProducts(){
		fetch(`http://localhost:4000/users/publishedSpecific/${id}`, {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
						'Authorization': `${localStorage.getItem("USR_TKN")}`
				}
		}).then( response =>{
				if(response.status < 400){
						response.json().then( jsonResponse => {
								let result: ProductObj[] = jsonResponse.message.map( (product: Published):ProductObj => {
									return {
										id: product.id,
										name: product.published,
										images: [product.image],
										date: product.date
									}
								});

								setPublished(result);
								
						} )
				}
		} ).catch(error => {
				console.log(error);
		});

	}



	function getWishlist(){
		fetch(`http://localhost:4000/home/specificWishlist/${id}`, {
				method: 'POST',
				headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
						'Authorization': `${localStorage.getItem("USR_TKN")}`
				}
		}).then( response =>{
				if(response.status < 400){
						response.json().then( jsonResponse => {
								console.log(jsonResponse);

								const productos: ProductObj[] = jsonResponse.message;


								setWishlist(productos);
						} );
				}
		} ).catch(error => {
				console.log(error);
		});
	}


	function showError(){
			let message:string = "Ha surgido un error.";

			if(errMessage === ""){
					setErrMessage(message);
			}

			return(
			<h3 style={{color: "red"}}>{errMessage}</h3>
			);
	}

	function showSuccess(){
			return(
					<h3 style={{color: "green"}}>Los cambios se han guardado con éxito.</h3>
			)
	}

	function removeFromWishList(id:number){
		fetch(`http://localhost:4000/home/removeSub/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${localStorage.getItem("USR_TKN")}`
            }}
        ).then(response =>{
            if(response.status < 400){
                //setFav(false);
                getWishlist();
            }
        }).catch(e=>{
            console.log(e);
        });
	}

	function removeFromListed(id:number){
		fetch(`http://localhost:4000/products/${id}`, {
				method: 'DELETE',
				headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
						'Authorization': `${localStorage.getItem("USR_TKN")}`
				}
		}).then(response =>{
			if(response.status < 400){
					//setFav(false);
					getPublishedProducts();
			}
	}).catch(e=>{
			console.log(e)
		});
	}

	useEffect(() => {
        
		getPublishedProducts();
		getWishlist();
        Information();
	}, [])
	
	return(
			<>
					{auth ? undefined : <Redirect to="/"/>}

					<Container component="main" maxWidth="md">
							<CssBaseline />
							<div className={classes.paper}>
									<Grid
									container
									spacing={5}
									md={12}
									>
											<Grid
											item
											md={12}
											style={{
													justifyItems: 'center',
													display: 'grid',
													paddingBottom: 0
											}}
											>
													<div
													style={{
															maxWidth: '100%',
															maxHeight: '100%',
															display: 'flex',
															justifyContent: 'center',
															paddingTop: '2%',
                                                            width: '900px'
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
																	>
																			<Typography
																			variant="h4"
																			>
																					{`${user.Nombre} ${user.Apellido}`}
                                                                                    
																			</Typography>
                                                                            {motivo == "0" &&
                                                                            <Button 
                                                                            type="submit"
                                                                            variant="contained"
                                                                            color="primary"
                                                                            className={classes.desestimar}
                                                                            >
                                                                                Denunciar
                                                                            </Button>}
																	</Grid>
															</Grid>
                                                            {rol == "Administrador" && (motivo !== "0" &&
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
													</div>
											</Grid>
											<Grid
											item
											md={12}
											>
													<div
													style={{
															width: '100%',
															height: '100%'
													}}
													>
															<Grid
															container
															md={12}
															spacing={3}
															//cols={3}
															>
																	{/*********Información del Usuario*********/}
																	<Grid
																	item
																	md={4}
																	>
																			<Card
																			className={classes.cards}
																			>
																					<CardHeader
																					title="Datos del Usuario"
																					align= "Center"
																					/>
																					<CardContent>
																							<form
																							onSubmit={updateUserData}
																							>
																									<Typography variant="h6">
																											Nombre
																									</Typography>
                                                                                                    {rol == "Administrador" ?
																									<TextField
																									id="userFName"
																									fullWidth
																									placeholder={user.Nombre}
																									variant="outlined"
																									className={classes.inputs}
																									/> :
                                                                                                    <TextField
																									id="userFName"
																									fullWidth
																									value={user.Nombre}
                                                                                                    area-readonly
																									variant="outlined"
																									className={classes.inputs}
																									/>
                                                                                                    }
																									<Typography variant="h6">
																											Apellido
																									</Typography>
                                                                                                    {rol == "Administrador" ? 
																									<TextField
																									id="userLName"
																									fullWidth
																									placeholder={user.Apellido}
																									variant="outlined"
																									className={classes.inputs}
																									/>: 
                                                                                                    <TextField
																									id="userLName"
																									fullWidth
																									value={user.Apellido}
                                                                                                    aria-readonly
																									variant="outlined"
																									className={classes.inputs}
                                                                                                    />}
																									<Typography variant="h6">
																											Correo
																									</Typography>
																									<TextField
																									id="email"
																									fullWidth
																									value={user.Email}
																									variant="outlined"
																									aria-readonly
																									className={classes.inputs}
																									/>
																									<Typography variant="h6">
																											Teléfono
																									</Typography>
                                                                                                    {rol == "Administrador" ? 
																									<TextField
																									id="phone"
																									fullWidth
																									placeholder={user.Telefono}
																									variant="outlined"
																									className={classes.inputs}
																									/>: <>
                                                                                                        <TextField
                                                                                                        id="phone"
                                                                                                        fullWidth
                                                                                                        value={user.Telefono}
                                                                                                        area-readonly
                                                                                                        variant="outlined"
                                                                                                        className={classes.inputs}
                                                                                                        />
                                                                                                        <br/><br/><br/><br/><br/>
                                                                                                    </>
                                                                                                    }
                                                                                                    {rol == "Administrador" && 
																									<Button
																									type="submit"
																									variant="contained"
																									color="primary"
																									className={classes.desestimar}
																									>
																											Actualizar Datos
																									</Button>}
																							</form>
																							{ showErr ? showError(): undefined }
																							{ success ? showSuccess(): undefined }
																					</CardContent>
																			</Card>
																	</Grid>

																	{/*********Historial de Publicaciones*********/}                                    
																	<Grid
																	item
																	md={4}
																	>
																			<div
																			style={{
																					width: '100%',
																					height: '100%'
																					
																			}}
																			>   

																					<Card className={classes.cards} >
																							<CardHeader
																							title="Historial de Publicaciones"
																							align= "Center"
																							
																					/>
																							<CardContent 
																							style={{
																									height: 508,
																									overflowY: 'scroll'
																							}}>
																								<CardScrollable products={publishedProducts} removeFunction={removeFromListed}/>
																							</CardContent>

																					</Card>
																			</div>
																	</Grid>

																	{/*********Favoritos*********/}
																	<Grid
																	item
																	md={4}
																	>
																			<div
																			style={{
																					width: '100%',
																					height: '100%',
																			}}
																			>   
																					<Card className={classes.cards}>
																							<CardHeader
																							title="Favoritos"
																							align= "Center"
																					/>
																							<CardContent 
																							style={{
																									height: 542,
																									overflowY: 'scroll'
																							}}>
																								<CardScrollable products={wishlist} removeFunction={removeFromWishList}/>
																							</CardContent>

																					</Card>
																			</div>
																	</Grid>
															</Grid>
													</div>   
											</Grid>
									</Grid>
							</div>
					</Container>
			</>
	);
}

export default OtherUserProfile;