import "./Estadísticas.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Estadisticas() {

    const data = [
        {
            name: 'Julio',
            egresos: 4000,
            ingresos: 2400,
            amt: 2400,
        },
        {
            name: 'Agosto',
            egresos: 3000,
            ingresos: 1398,
            amt: 2210,
        },
        {
            name: 'Septiembre',
            egresos: 2000,
            ingresos: 9800,
            amt: 2290,
        },
        {
            name: 'Octubre',
            egresos: 2780,
            ingresos: 3908,
            amt: 2000,
        },
        {
            name: 'Noviembre',
            egresos: 1890,
            ingresos: 4800,
            amt: 2181,
        },
        {
            name: 'Diciembre',
            egresos: 2390,
            ingresos: 3800,
            amt: 2500,
        },
        {
            name: 'Enero',
            egresos: 3490,
            ingresos: 4300,
            amt: 2100,
        },
        {
            name: 'Febrero',
            egresos: 6500,
            ingresos: 3000,
            amt: 2400,
        },
        {
            name: 'Marzo',
            egresos: 3700,
            ingresos: 4898,
            amt: 2210,
        },
        {
            name: 'Abril',
            egresos: 4300,
            ingresos: 7300,
            amt: 2290,
        },
        {
            name: 'Mayo',
            egresos: 1580,
            ingresos: 4108,
            amt: 2000,
        },
        {
            name: 'Junio',
            egresos: 2590,
            ingresos: 2800,
            amt: 2181,
        },
    ];
    
    return(
        <div className="Estadisticas">
            <h3 className="estadisticasTitle">Análisis de ventas</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>    
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey="name" stroke="#233142"></XAxis>
                    <YAxis/>
                    <Line type="monotone" dataKey="ingresos" stroke="#008F29" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="egresos" stroke="#F95959" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Estadisticas;