import "./Categorias.css";
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductObj from "../../interfaces/ProductObj";
import { Redirect } from "react-router-dom";
import placeholder from "../../img/item-placeholder.png";

let templateProducts: ProductObj[] = [{
    id: 0,
    owner: "Juan Orlando",
    department: "Honduras de alla",
    municipy: "Tela",
    name: "Baleada",
    price: "13",
    details: "Baleada con queso y horchata",
    images: [`${placeholder}`],
    date: "ayer",
    vendorID: 0
}];


function ProductsList() {

    const [products, setProducts] = useState<ProductObj[] | []>(templateProducts);

    useEffect(() => {
        getProducts();
    }, []);

    function getProducts(){
        fetch('http://localhost:4000/products/productInfo ',{
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
                    setProducts(jsonResponse.message);
                })
            }
        }).catch(e=>{
            console.log(e);
        });
    }

    const columns = [
        { field: 'id', headerName: 'ID', type: 'number', width: 120 },
        { field: 'ProductName', headerName: 'Nombre del Producto', width: 300, editable: true },
        { field: 'Departamento', headerName: 'Departamento', width: 180, editable: true },
        { field: 'Precio', headerName: 'Precio', type: 'number', width: 200, editable: true },
        { 
            field: 'Desabilitar', 
            headerName: 'Dar de Baja', 
            width: 200,
            renderCell: (params: any) => {
                return (
                    <>
                        <Link to={"/user/"+params.row.id} className="elementos">
                            <button className="CategoryList2">Eliminar</button>
                            <DeleteOutline className="CategoryListIcon"/>
                        </Link>
                    </>
                )
            } 
        },
    ];

    const rows: any = []
    {products.map((row) => (
        rows.push ({ id: row.id, ProductName: row.name, Departamento: row.department, Precio: row.price,  Desabilitar: 'si'} )
    ))};

    return (
        <>
            <div className="CategoryList">
            
                <DataGrid
                    rows={rows}
                    disableSelectionOnClick
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                />
            
            </div>
        </>
    );
}

export default ProductsList;
