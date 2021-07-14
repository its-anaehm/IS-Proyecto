import { db } from "../config/database";

export default class MunicipyService{

    public static getMunicipy = async ( id: Number | string) => {
        let [row] = await db.query("SELECT Nombre FROM Municipio WHERE Municipio.id = ?", [id])
        return JSON.parse(JSON.stringify(row))[0]["Nombre"]
    }

}