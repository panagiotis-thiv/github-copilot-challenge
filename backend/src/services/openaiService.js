// Import OpenAI
const OpenAI = require('openai');

// Initialize OpenAI API directly with your key
const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

let conversationHistory = [
  {
    role: 'system',
    content: `You are an assistant that asks relevant follow-up questions to understand what the user wants to achieve, their goal. 
              You only ask the question and nothing else. For example, if they ask you "I want to create a game" you only respond with 
              "What type of game". No need for examples, only if prompted by the request`,
  },
];

// Function to generate a response
const generateResponse = async (prompt) => {
  conversationHistory.push({ role: 'user', content: prompt });

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini', 
      messages: conversationHistory,
      max_tokens: 20,
      temperature: 0.1, 
    });

    const assistantMessage = response.choices[0].message.content.trim();

    conversationHistory.push({ role: 'assistant', content: assistantMessage });

    return assistantMessage;
  } catch (error) {
    console.error('Error with OpenAI API:', error.response?.data || error.message);
    throw new Error('Failed to fetch response from OpenAI');
  }
};


module.exports = { generateResponse };