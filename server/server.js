const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const Frase = require('./Frase');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

const MONGODB_URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.0gfmv72.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;


app.get("/frases", async (req, res) => {
  try {
    const frases = await Frase.find();
    const random = frases[Math.floor(Math.random() * frases.length)];
    res.json(random);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener frases" });
  }
});

app.post("/frases", async (req, res) => {
  try {
    const { frase, autor } = req.body;

    if (!frase || !autor) {
      return res.status(400).json({ error: "Frase y autor son requeridos" });
    }

    const nuevaFrase = new Frase({ frase, autor });
    await nuevaFrase.save();

    res.status(201).json({ message: "Frase creada correctamente", frase: nuevaFrase });
  } catch (err) {
    res.status(500).json({ error: "Error al crear la frase" });
  }
});


mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
}
).catch(err => {
    console.error('MongoDB connection error:', err);
}
);

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));