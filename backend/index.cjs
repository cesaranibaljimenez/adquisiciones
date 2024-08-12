const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI no está definida en el archivo .env');
  process.exit(1);
}

console.log('Connecting to MongoDB with URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Definición del modelo de datos
const SpecificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tables: [{
    label: { type: String, required: true },
    columns: [{ type: String, required: true }],
    rows: [{ type: mongoose.Schema.Types.Mixed, required: true }],
  }],
});

const Specification = mongoose.model('Specification', SpecificationSchema);

app.post('/saveSpecification', async (req, res) => {
  const { title, tables } = req.body;
  console.log('Received specification:', { title, tables });
  try {
    const newSpecification = new Specification({ title, tables });
    await newSpecification.save();
    res.status(201).send(newSpecification);
  } catch (error) {
    console.error('Error saving specification:', error);
    res.status(500).send({ message: 'Error saving specification', error });
  }
});

app.get('/getSpecifications', async (req, res) => {
  try {
    const specifications = await Specification.find({});
    res.status(200).send(specifications);
  } catch (error) {
    console.error('Error fetching specifications:', error);
    res.status(500).send({ message: 'Error fetching specifications', error });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
