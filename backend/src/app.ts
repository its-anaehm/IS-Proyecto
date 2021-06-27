import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import morgan from "morgan";

import './database';
import routes from './routes/index.routes';

dotenv.config();
const app = express();

app.set('port', process.env.PORT || 4000 )

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());

app.use('/',routes);

export default app;