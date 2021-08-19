import "./StadisticsView.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function StadisticsNewUsers (){
    const data = [
        {
            name: 'Agosto',
            Usuarios: 979,
        },
        {
            name: 'Septiembre',
            Usuarios: 6658,
        },
        {
            name: 'Octubre',
            Usuarios: 7248,
        },
        {
            name: 'Noviembre',
            Usuarios: 4129,
        },
        {
            name: 'Diciembre',
            Usuarios: 6762,
        },
        {
            name: 'Enero',
            Usuarios: 5943,
        },
        {
            name: 'Febrero',
            Usuarios: 5289,
        },
        {
            name: 'Marzo',
            Usuarios: 9646,
        },
        {
            name: 'Abril',
            Usuarios: 4518,
        },
        {
            name: 'Mayo',
            Usuarios: 2290,
        },
        {
            name: 'Junio',
            Usuarios: 2746,
        },
        {
            name: 'Julio',
            Usuarios: 7496,
        },
    ];
    
    return(
        <div className="StadisticsView2">
            <h3 className="StadisticsTitle">Usuarios Nuevos por Mes</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>    
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey="name" stroke="#233142"></XAxis>
                    <YAxis/>
                    <Line type="monotone" dataKey="Usuarios" stroke="#fe9144" activeDot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StadisticsNewUsers;