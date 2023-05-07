import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import clientRoutes from './routes/client.js';
import salesRoutes from './routes/sales.js';
import managementRoutes from './routes/management.js';
import generalRoutes from './routes/general.js';

// data
import User from './models/User.js';
import { dataUser } from './data/data.js';

// config
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routes

app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

// mongoose

const PORT = process.env.PORT || 3000;
const URL = process.env.DB_CONNECT;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
    // User.insertMany(dataUser);
    // one time inject
  })
  .catch((err) => {
    console.log(err);
  });
