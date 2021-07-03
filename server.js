import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDb from './db.js';
import cors from 'cors';

dotenv.config();

const app   = express();
const PORT  = process.env.PORT;

connectDb();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'S Ahmed Naim' });
});

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
