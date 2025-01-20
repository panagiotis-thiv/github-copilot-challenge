//Importing OpenAI
const OpenAI = require('openai');

//Initializing the OpenAI API key
const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

//A conversation history to keep track of the conversation and have the full history of the user for the AI.
let conversationHistory = [
  {
    role: 'system',
    content: `You are an assistant that asks relevant follow-up questions to understand what the user wants to achieve, their goal. 
              You only ask the question and nothing else. For example, if they ask you "I want to create a game" you only respond with 
              "What type of game". No need for examples, only if prompted by the request. The first question they answer is "What's your goal".
              The type of questions can be like: What type of game, what platform, what features and last ask them
              if they know any programming languagues/technologies for their goal. Again a goal could be from making a game to making a website.
              Every answer will be programmaming related. In other words ask them question relating to this category each time:
              They automatically answer the first question which is "What's your goal". So then you can ask them:,
              What type of X, If they know any programming languages/technologies for their goal, platform (don't overcomplicate it,
              if they say mobile dont ask android or ios), and some features.
              If its a website of course platform isnt revelant so something similar, like their target audience.`,
  },
];

//Count how many times the generateResponse is called
let responseCount = {
  count: 0, 
  responseCompleted: false, 
};

//Function to generate a response according to the users answers
const generateResponse = async (prompt) => {

  if (responseCount.responseCompleted) {
    return "@NoResponseType1@";
  }

  responseCount.count++;

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

    if (responseCount.count >= 5) {
      responseCount.responseCompleted = true;
    }

    return assistantMessage;
  } catch (error) {
    console.error('Error with OpenAI API:', error.response?.data || error.message);
    throw new Error('Failed to fetch response from OpenAI');
  }
};

//Bool for other functions
let mainGoalBool = false;
let summaryBool = false;
let tasksBool = false;

//Function to generate the main goal
const generateMainGoal = async () => {

  if (mainGoalBool) return "@NoResponseType2@";

  try {
    mainGoalBool = true;
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        ...conversationHistory,
        {
          role: 'system',
          content: `Summarize the user's main goal in a few words. For example, if they have talked about making a game, you can
                    respond with just "Creating a (platform, mobile, windows etc ) game". Same with a website, a program etc.
                    Don't add any other details.
                    If you get called and you have no previous prompts only the one that starts with "You are an assistant" then
                    reply with "Invalid generateMainGoal call`,
        },
      ],
      max_tokens: 20,
      temperature: 0.3,
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error with OpenAI API:', error.response?.data || error.message);
    throw new Error('Failed to generate main goal');
  }
};

//Function to generate the detailed summary
const generateSummary = async () => {

  if (summaryBool) return "@NoResponseType3@";

  try {
    summaryBool = true;
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        ...conversationHistory,
        {
          role: 'system',
          content: `Provide a detailed summary of the user's goal. For example, if they have talked about making a game, you can say
                    A 2d mobile game with a pve style that fights asteroids as a spaceship. If they have talked about a lot of features,
                    just mention, "with a lot of twists or features". It doesn't have to be very big, short-medium and concise. Refer
                    to the user, say "Your goal is...."
                    If you get called and you have no previous prompts only the one that starts with "You are an assistant" then
                    reply with "Invalid generateSummary call"`,
        },
      ],
      max_tokens: 50,
      temperature: 0.3,
    });

    return  response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error with OpenAI API:', error.response?.data || error.message);
    throw new Error('Failed to generate detailed summary');
  }
};

const generateTasks = async () => {
  if (tasksBool) return "@NoResponseType4@";

  try {
    tasksBool = true;
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        ...conversationHistory,
        {
          role: 'system',
          content: `Based on the user's goal, generate 10 tasks that they need to complete. 
                    The tasks should be actionable and relevant to their goal. 
                    For example, if they are making a game, tasks might include: 
                    1. Define the game concept 
                    2. Choose a game engine 
                    3. Design the game mechanics, etc. 
                    4. Learning the programming languages required.
                    Keep the tasks short and concise.
                    Don't type anything else. Just the tasks.
                    If you get called and you have no previous prompts only the one that starts with "You are an assistant" then
                    reply with "Invalid generateTasks call"`,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const taskList = response.choices[0].message.content
    .trim()
    .split('\n')
    .map(task => task.replace(/^\d+\.\s*/, '').trim());

    // console.log("Processed Task List:\n", taskList);

    return taskList;
  } catch (error) {
    console.error('Error with OpenAI API:', error.response?.data || error.message);
    throw new Error('Failed to generate tasks');
  }
};


const resetAIPrompts = async () => {
  responseCount.count = 0;
  responseCount.responseCompleted = false;

  mainGoalBool = false;
  summaryBool = false;
  tasksBool = false;

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

  return "@Success@";
};

module.exports = { generateResponse, generateMainGoal, generateSummary, generateTasks, resetAIPrompts};