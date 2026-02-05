const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock insect database
let insects = [
  { id: 1, name: 'Monarch Butterfly', species: 'Danaus plexippus', location: 'Garden', captured: true },
  { id: 2, name: 'Ladybug', species: 'Coccinellidae', location: 'Park', captured: true },
  { id: 3, name: 'Dragonfly', species: 'Anisoptera', location: 'Pond', captured: false },
  { id: 4, name: 'Honeybee', species: 'Apis mellifera', location: 'Meadow', captured: true },
  { id: 5, name: 'Praying Mantis', species: 'Mantis religiosa', location: 'Forest', captured: false }
];

// API Routes
app.get('/api/insects', (req, res) => {
  res.json(insects);
});

app.get('/api/insects/:id', (req, res) => {
  const insect = insects.find(i => i.id === parseInt(req.params.id));
  if (insect) {
    res.json(insect);
  } else {
    res.status(404).json({ message: 'Insect not found' });
  }
});

app.post('/api/insects', (req, res) => {
  const newInsect = {
    id: insects.length + 1,
    name: req.body.name,
    species: req.body.species,
    location: req.body.location,
    captured: req.body.captured || false
  };
  insects.push(newInsect);
  res.status(201).json(newInsect);
});

app.put('/api/insects/:id', (req, res) => {
  const insect = insects.find(i => i.id === parseInt(req.params.id));
  if (insect) {
    insect.name = req.body.name || insect.name;
    insect.species = req.body.species || insect.species;
    insect.location = req.body.location || insect.location;
    insect.captured = req.body.captured !== undefined ? req.body.captured : insect.captured;
    res.json(insect);
  } else {
    res.status(404).json({ message: 'Insect not found' });
  }
});

app.delete('/api/insects/:id', (req, res) => {
  const index = insects.findIndex(i => i.id === parseInt(req.params.id));
  if (index !== -1) {
    insects.splice(index, 1);
    res.json({ message: 'Insect deleted successfully' });
  } else {
    res.status(404).json({ message: 'Insect not found' });
  }
});

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🦋 Insect Capture Server running on port ${PORT}`);
});
