interface ComplaintObj{
    id: number,
    fk_id_denunciador: number,
    fk_id_acusado: number,
    NombreDenunciador: string,
    NombreAcusado: string,
    date: string,
    Tipo_Denuncia: number,
    Estado: string
}


export default ComplaintObj;