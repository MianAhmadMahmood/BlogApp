import express from 'express';
import cors from 'cors'; 
import authRoutes from "./routes/blog.js";
import connectToMongo from './config/db.js';
const app = express();
const PORT = 9000;

connectToMongo();

app.use(cors())

app.use(express.json())

app.use(express.static('public/upload'))

app.get('/', (req, res) => {
    res.send('API is running..');
});

// APi Routes


app.use("/api/v1", authRoutes)
app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
});
