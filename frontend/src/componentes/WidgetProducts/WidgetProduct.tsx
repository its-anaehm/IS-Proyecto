import "./WidgetProduct.css";
import { Link } from 'react-router-dom';
import { Store, Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import ProductAdminObj from "../../interfaces/ProductAdminObj";
import { Redirect } from "react-router-dom";
import placeholder from "../../img/item-placeholder.png";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

let templateProducts: ProductAdminObj[] = [{
    id: 0,
    owner: "Juan Orlando",
    department: "Honduras de alla",
    municipy: "Tela",
    name: "Baleada",
    price: "13",
    details: "Baleada con queso y horchata",
    images: [`${placeholder}`],
    date: "ayer",
    Disponibilidad: "Disponible"
}];

function WidgetProduct(){

    const [products, setProducts] = useState<ProductAdminObj[] | []>(templateProducts);

    useEffect(() => {
        getProducts();
    }, []);

    function getProducts(){
        fetch('http://localhost:4000/products/getAllProductsConfig',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }
        ).then( response => {
            if(response.status < 400){
                response.json().then(jsonResponse => {
                    console.log(jsonResponse)
                    setProducts(jsonResponse);
                })
            }
        }).catch(e=>{
            console.log(e);
        });
    }

    return (
        <div className="WidgetProduct">
            <Link to="/catalogue" className="WidgetProductTitle">Productos</Link>
            <ul className="WidgetProductList">
                <li className="WidgetProductListItem">
                    <div className="WidgetProductInfo">
                    <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Producto</TableCell>
                                        <TableCell align="right">Precio</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {products.map((data) => (
                                <TableRow key={data.id}>
                                    <TableCell component="th" scope="row" width="200">
                                        {data.name}
                                    </TableCell>
                                    <TableCell align="right" width="200">{data.price}</TableCell>
                                    <TableCell align="right" width="100">
                                        <button className="buttom">
                                            <Visibility className="widgetVSIcon"/>
                                            <Link to={"/products/"+data.id} className="MostrarC">
                                                Mostrar
                                            </Link>
                                        </button>                                        
                                    </TableCell>
                                </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default WidgetProduct;