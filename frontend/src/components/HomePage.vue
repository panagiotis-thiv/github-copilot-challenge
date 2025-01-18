<template>
    <div>
      <div class="main-text">
        <h3>You can't always stick to the past
        <br>You can't always think about the future. 
        <br>But you can think of the present.
        <br><br><br><p>So tell me, what are you waiting for?</p>
        </h3>
      </div>
      <div class="button-container">
        <button data-id="start" @click="startGoal">Start your goal now</button>
        <button>Help others start their goal</button>
      </div>
      <div class="website-details">
        <h1>YourPath.</h1>
        <h3>YourPath is a website that can help you achieve what you always want to. 
        <br>It uses AI to help you start your journey but AI won't finish it.
        <br>It only clears the first part of your path, not the whole.
        <br>And if you have already figured it out. 
        <br>You can help others start their journey too.
        </h3>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    methods: {
      startGoal() {
        const explosion = document.createElement('div');
        explosion.classList.add('light-explosion');
        document.body.appendChild(explosion);
  
        // Remove explosion after animation and redirect
        setTimeout(() => {
          explosion.remove();
          window.location.href = '/questions';
        }, 1500);
      },
    },
  };
  </script>
  
  <style scoped>
  .main-text {
    color: #ffffff92;
    font-style: italic;
    font-family: 'Nunito', sans-serif;
    text-align: center;
    margin-top: 50px;
    user-select: none; 
  }
  
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin-top: 240px; 
    font-family: 'Nunito', sans-serif;
  }
  
  button {
    user-select: none; 
    padding: 20px 40px;
    font-size: 16px;
    font-family: 'Nunito', sans-serif;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #0f243f; 
    color: #ffffff66;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 100);
  }
  
  button:hover {
    background-color: #162f4f;
    color: #ffffffaa;
    box-shadow: 0px 6px 8px rgba(19, 156, 161, 0.596);
  }
  
  .website-details {
    color: #228d91db;
    font-family: 'Nunito', sans-serif;
    text-align: center;
    margin-top: 200px;
    user-select: none;
  }
  </style>
  