import express from "express";
import cors from 'cors';
import path from 'path';
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";

import './config/database';
import { storage, fields} from './config/storage';
import routes from './routes/index.routes';

dotenv.config();
const app = express();

app.set('port', process.env.PORT || 4000 )

app.use(morgan('dev'))
app.use(cors());
app.use(multer({ storage: storage}).fields(fields))
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({extended: false}))

app.use('/',routes);

export default app;