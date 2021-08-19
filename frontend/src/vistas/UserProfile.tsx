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
import Rating, { IconContainerProps } from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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
    aceptar: {
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
  }));

interface UserProfileProps{
    auth: boolean,
    currentUser: UserObj,
    setCurrentUser: (user: UserObj)=>void
}

let templateProducts:ProductObj[] =[{
	id:0,
	name: "producto",
	price: "0.00",
	images: ["item-placeholder.png"]
}];

interface Published{
	id: number,
	published: string,
	date: string,
	image: string
}

function UserProfile({
	auth,
	currentUser,
	setCurrentUser
}:UserProfileProps){
	const classes = useStyles();
	const [showErr, setShowErr] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [errMessage, setErrMessage] = useState<string>("");
	const [publishedProducts, setPublished] = useState<ProductObj[]>(templateProducts);
	const [wishlist, setWishlist] = useState<ProductObj[] | []>(templateProducts);
	const [qualification, setQualification] = useState<number>(0);


	function updateUserData(e: React.FocusEvent<HTMLFormElement>){
			e.preventDefault();
			let requestURL:string = `http://localhost:4000/users/${currentUser.ID}`;

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
							firstName: nombre === "" ? currentUser.Nombre : nombre,
							lastName: lName==="" ? currentUser.Apellido : lName,
							email: currentUser.Email,
							phone: telefono === "" ? currentUser.Telefono : telefono
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
											setCurrentUser(newUser);
											localStorage.setItem("USR", JSON.stringify(newUser));
									});
							}
						} ).catch(error => {
							setSuccess(false);
							setShowErr(true);
						});
			}

			

	}



	//JUAN
	
	function getPublishedProducts(){
		fetch("http://localhost:4000/users/published", {
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
		fetch("http://localhost:4000/home/wishlist", {
				method: 'GET',
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
	//JUAN


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

	function getUserScore(){
		fetch(`http://localhost:4000/qualification/${currentUser.ID}`, {
				method: 'GET',
				headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
						'Authorization': `${localStorage.getItem("USR_TKN")}`
				}
		}).then( response =>{
				if(response.status < 400){
						response.json().then( jsonResponse => {
								//console.log(jsonResponse);
								setQualification(parseFloat(`${jsonResponse.qualification.qualification}`));
								
						} );
				}
		} ).catch(error => {
				console.log(error);
		});
	}

	useEffect(() => {
		getPublishedProducts();
		getWishlist();
		getUserScore();
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
																					{`${currentUser.Nombre} ${currentUser.Apellido}`}
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
																	</Grid>
															</Grid>
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
																									<TextField
																									id="userFName"
																									fullWidth
																									//label="Nombre"
																									placeholder={currentUser.Nombre}
																									variant="outlined"
																									className={classes.inputs}
																									/>
																									<Typography variant="h6">
																											Apellido
																									</Typography>
																									<TextField
																									id="userLName"
																									fullWidth
																									//label="Apellido"
																									placeholder={currentUser.Apellido}
																									variant="outlined"
																									className={classes.inputs}
																									/>
																									<Typography variant="h6">
																											Correo
																									</Typography>
																									<TextField
																									id="email"
																									fullWidth
																									//label="Correo"
																									value={currentUser.Email}
																									variant="outlined"
																									aria-readonly
																									className={classes.inputs}
																									/>
																									<Typography variant="h6">
																											Teléfono
																									</Typography>
																									<TextField
																									id="phone"
																									fullWidth
																									//label="Correo"
																									placeholder={currentUser.Telefono}
																									variant="outlined"
																									className={classes.inputs}
																									/>
																									<Button
																									type="submit"
																									variant="contained"
																									color="primary"
																									className={classes.aceptar}
																									>
																											Actualizar Datos
																									</Button>
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

export default UserProfile;