const express = require('express');
const router = express.Router();
const { generateResponse, generateMainGoal, generateSummary } = require('../services/openaiService');

//To test if backend is working
router.get('/health', (req, res) => {
    res.json({ status: 'API is running', timestamp: new Date() });
});

//OpenAI route
//POST requests are sent to http://"localhost:5000"/api/generate
router.post('/generate', async (req, res) => {
    //Gets the prompt from the request body
    const { type, prompt } = req.body;

    if (!type) {
      return res.status(400).json({ error: 'Request type is required' });
    }

    try {
      //Generates a response according to the request type
      let aiResponse;

      if (type == 'mainGoal') {
        console.log("I got called, generating main goal");
        aiResponse = await generateMainGoal();
      } 
      else if (type === 'summary') {
        aiResponse = await generateSummary();
      } 
      else if (type === 'questions') {
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required for type "response"' });
        }

        aiResponse = await generateResponse(prompt);
      } 
      else {
        return res.status(400).json({ error: 'Invalid request type' });
      }
      
      res.json({ response: aiResponse });

    } catch (error) {
      res.status(500).json({ error: 'Failed to generate response' });
    }
});

module.exports = router;