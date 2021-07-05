import { Link as LinkRoute } from "react-router-dom";

function LandingPage(){
    return(
        <>
            <h1>Pagina de inicio</h1>
            <LinkRoute to="/login">{"Realizar Login aquí."}</LinkRoute>
        </>
    )
}

export default LandingPage;