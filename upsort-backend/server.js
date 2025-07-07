const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://upsort-careers-react.onrender.com',
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.post('/api/register', async (req, res) => {
  console.log('Request received at /api/register:', req.body);
  const { firstName, lastName, email, contact, city } = req.body;

  try {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    const response = await axios.post('https://script.google.com/macros/s/AKfycbzQnsMhi9utQRrruU-sKjzoJFvCiKOAgUChMK1zXaQg_4FMNXLl8xDPuUDicnb8OsE/exec', {
      firstName, lastName, email, contact, city, timestamp
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

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

  try {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    const response = await axios.post(
      'https://script.google.com/macros/s/AKfycbyo5urVgwj8iOBCLpcCJJumF2y3yYU97ZUPZEt4qQ3VmhdCMatGV6PjRuEqwlqabKA/exec',
      {
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
        timestamp
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

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
