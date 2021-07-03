import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'S Ahmed Naim' });
});

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));
