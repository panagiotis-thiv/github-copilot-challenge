const express = require('express');
const router = express.Router();
const { generateResponse } = require('../services/openaiService');

//To test if backend is working
router.get('/health', (req, res) => {
    res.json({ status: 'API is running', timestamp: new Date() });
});

//OpenAI route
//POST requests are sent to http://"localhost:5000"/api/generate
router.post('/generate', async (req, res) => {
    //Gets the prompt from the request body
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    try {
      //Generates a response using the prompt
      const aiResponse = await generateResponse(prompt);
      res.json({ response: aiResponse });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate response' });
    }
});

module.exports = router;