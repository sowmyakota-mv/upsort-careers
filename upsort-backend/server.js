const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://upsort-careers-website.onrender.com',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Registration form route
const qs = require('qs');

app.post('/api/register', async (req, res) => {
  console.log('Request received at /api/register:', req.body);
  const formData = req.body;

  try {
    const response = await axios.post(
      'https://script.google.com/macros/s/AKfycbzbSTjwqpYSD8QD8ZBU1QEjcVq-jBdBWa-XSWz0BJ1vRqnzVfXhx0cXYn8hPfQYzKohtA/exec',
      qs.stringify(formData), 
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    console.log('Registration submitted:', response.data);
    res.status(200).json({ message: 'Registration form submitted successfully', data: response.data });
  } catch (error) {
    console.error('Error submitting registration form:', error.message);
    res.status(500).json({ message: 'Failed to submit registration form', error: error.message });
  }
});


app.post('/api/assessment', async (req, res) => {
  console.log('Request received at /api/assessment:', req.body);

  const {
    name,
    contact,
    email,
    question_1,
    question_2,
    question_3,
    question_4,
    question_5,
    question_6,
    question_7,
    question_8,
    question_9,
    question_10
  } = req.body;

  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

  try {
    const response = await axios.post('https://script.google.com/macros/s/AKfycbwTHEPlLxv9YleIRHB8rCPQYJCTHeepsg1l7_PFH09W2j1ID8SUhp-kYsDmmqd2oXC3ZQ/exec', {
      name,
      contact,
      email,
      question_1,
      question_2,
      question_3,
      question_4,
      question_5,
      question_6,
      question_7,
      question_8,
      question_9,
      question_10,
      timestamp,
    }, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Assessment submitted:', response.data);
    res.status(200).json({ message: 'Assessment form submitted successfully', data: response.data });
  } catch (error) {
    console.error('Error submitting assessment form:', error.message);
    res.status(500).json({ message: 'Failed to submit assessment form', error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
