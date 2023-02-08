import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import cinemasRoutes from './routes/cinemas.js';
import userRoutes from './routes/user.js';

const app = express(); // expressin metodlarindan istifade etmek ucun app funksiyasi yaradilir
dotenv.config(); // .env faylindan asililiq yaradir ve process.env-den istifade etmekle proses idare edilir

// bodyparser midlverdir. limit request-in oturulme hecmidir, extended ise key-value-da valuenun hansi tip (true-istenilen tip) olmasina isaredir
app.use(bodyParser.json({ limit: "3mb", extended: true })); // json UNICODE fayllarin oturulmesinde midlveri ise salir
app.use(bodyParser.urlencoded({ limit: "3mb", extended: true })); // encode olunmus UTF-8 fayllarin oturulmesinde midlveri ise salir

app.use(cors()); // basqa resursdan melumatin alinib oturulmesi ucun lazim olan vasitedir (mes: react-dan)

app.use('/cinemas', cinemasRoutes);
app.use('/user', userRoutes);

// backende port verilir ve baza ile elaqe yaradilir
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.db_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`You re in the port number ${PORT}`)))
.catch((error) => console.log(error.message));