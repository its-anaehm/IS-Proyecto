import "./StadisticsView.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Estadisticas() {

    const data = [
        {
            name: 'Agosto',
            Egresos: 3000,
            Ingresos: 1398,
            amt: 2210,
        },
        {
            name: 'Septiembre',
            Egresos: 2000,
            Ingresos: 9800,
            amt: 2290,
        },
        {
            name: 'Octubre',
            Egresos: 2780,
            Ingresos: 3908,
            amt: 2000,
        },
        {
            name: 'Noviembre',
            Egresos: 1890,
            Ingresos: 4800,
            amt: 2181,
        },
        {
            name: 'Diciembre',
            Egresos: 2390,
            Ingresos: 3800,
            amt: 2500,
        },
        {
            name: 'Enero',
            Egresos: 3490,
            Ingresos: 4300,
            amt: 2100,
        },
        {
            name: 'Febrero',
            Egresos: 6500,
            Ingresos: 3000,
            amt: 2400,
        },
        {
            name: 'Marzo',
            Egresos: 3700,
            Ingresos: 4898,
            amt: 2210,
        },
        {
            name: 'Abril',
            Egresos: 4300,
            Ingresos: 7300,
            amt: 2290,
        },
        {
            name: 'Mayo',
            Egresos: 1580,
            Ingresos: 4108,
            amt: 2000,
        },
        {
            name: 'Junio',
            Egresos: 2590,
            Ingresos: 2800,
            amt: 2181,
        },
        {
            name: 'Julio',
            Egresos: 4000,
            Ingresos: 2400,
            amt: 2400,
        },
    ];
    
    return(
        <div className="StadisticsView2">
            <h3 className="StadisticsTitle">Análisis de ventas</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>    
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey="name" stroke="#233142"></XAxis>
                    <YAxis/>
                    <Line type="monotone" dataKey="Ingresos" stroke="#008F29" activeDot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Egresos" stroke="#F95959" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Estadisticas;