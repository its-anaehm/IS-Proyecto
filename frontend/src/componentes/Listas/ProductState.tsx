import "./Categorias.css";
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductAdminObj from "../../interfaces/ProductAdminObj";
import { Redirect } from "react-router-dom";
import placeholder from "../../img/item-placeholder.png";

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

function ProductsList() {

    const [products, setProducts] = useState<ProductAdminObj[] | []>(templateProducts);

    useEffect(() => {
        getProducts();
    }, []);

    function getProducts(){
        fetch('http://localhost:4000/products/getAllProducts',{
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

    const columns = [
        { field: 'id', headerName: 'ID', type: 'number', width: 120 },
        { field: 'ProductName', headerName: 'Nombre del Producto', width: 300, editable: true },
        { field: 'Departamento', headerName: 'Departamento', width: 180, editable: true },
        { field: 'Precio', headerName: 'Precio', type: 'number', width: 200, editable: true },
        { field: 'Estado', headerName: 'Estado', width: 200, editable: true},
    ];

    console.log(products)

    const rows: any = []
    {products.map((row) => (
        rows.push ({ id: row.id, ProductName: row.name, Departamento: row.department, Precio: row.price,  Estado: row.Disponibilidad })
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
