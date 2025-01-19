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
              "What type of game". No need for examples, only if prompted by the request. The first question they answer is "What's your goal".
              The type of questions can be like: What type of game, what platform, what features and last ask them
              if they know any programming languagues/technologies for their goal. Again a goal could be from making a game to making a website.
              Every answer will be programmaming related.`,
  },
];

//Function to generate a response
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

//Function to generate the main goal
const generateMainGoal = async () => {
  console.log("I got called inside ai, generating main goal");
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        ...conversationHistory,
        {
          role: 'system',
          content: `Summarize the user's main goal in a few words. For example, if they have talked about making a game, you can
                    respond with just "Creating a (platform, mobile, windows etc ) game". Same with a website, a program etc.
                    Don't add any other details.`,
        },
      ],
      max_tokens: 20,
      temperature: 0.3,
    });
    console.log("I should asnwer with main goal: ", response.choices[0].message.content.trim());
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error with OpenAI API:', error.response?.data || error.message);
    throw new Error('Failed to generate main goal');
  }
};

//Function to generate the detailed summary
const generateSummary = async () => {
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        ...conversationHistory,
        {
          role: 'system',
          content: `Provide a detailed summary of the user's goal. For example, if they have talked about making a game, you can say
                    A 2d mobile game with a pve style that fights asteroids as a spaceship. If they have talked about a lot of features,
                    just mention, "with a lot of twists or features". It doesn't have to be very big, short-medium and concise.`,
        },
      ],
      max_tokens: 50,
      temperature: 0.3,
    });

    conversationHistory = [
      {
        role: 'system',
        content: `You are an assistant that asks relevant follow-up questions to understand what the user wants to achieve, their goal. 
                  You only ask the question and nothing else. For example, if they ask you "I want to create a game" you only respond with 
                  "What type of game". No need for examples, only if prompted by the request. The first question they answer is "What's your goal".
                  The type of questions can be like: What type of game, what platform, what features and last ask them
                  if they know any programming languages/technologies for their goal. Again a goal could be from making a game to making a website.
                  Every answer will be programming related.`,
      },
    ];
    return  response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error with OpenAI API:', error.response?.data || error.message);
    throw new Error('Failed to generate detailed summary');
  }
};



module.exports = { generateResponse, generateMainGoal, generateSummary };