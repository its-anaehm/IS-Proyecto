import "./StadisticsView.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function StadisticsNewUsers (){
    const data = [
        {
            name: 'Agosto',
            Usuarios: 3000,
        },
        {
            name: 'Septiembre',
            Usuarios: 2000,
        },
        {
            name: 'Octubre',
            Usuarios: 2780,
        },
        {
            name: 'Noviembre',
            Usuarios: 1890,
        },
        {
            name: 'Diciembre',
            Usuarios: 2390,
        },
        {
            name: 'Enero',
            Usuarios: 3490,
        },
        {
            name: 'Febrero',
            Usuarios: 6500,
        },
        {
            name: 'Marzo',
            Usuarios: 3700,
        },
        {
            name: 'Abril',
            Usuarios: 4300,
        },
        {
            name: 'Mayo',
            Usuarios: 1580,
        },
        {
            name: 'Junio',
            Usuarios: 2590,
        },
        {
            name: 'Julio',
            Usuarios: 4000,
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