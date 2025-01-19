<template>
    <div>
      <div class="main-text">
        <h3>You can't always stick to the past
        <br>You can't always think about the future. 
        <br>But you can think of the present.
        </h3>
      </div>
      <div class = "question-text">
        <h2>So tell me, what are you waiting for?</h2> <br>
      </div>
      <div class="button-container">
        <button data-id="start" @click="startGoal">Start your goal now</button>
        <button>Help others start their goal</button>
      </div>
      <div class="website-details">
        <h1>BuildYourPath.</h1>
        <h3>BuildYourPath is a website that can help you achieve what you always want to. 
        <br>It uses AI to help you start your journey but it won't finish it.
        <br>It only creates the first part of your path, not the whole.
        <br>And if you have already figured it out. 
        <br>You can help others with their journey too.
        </h3>
        <h4>
          Build for the GitHub Copilot Challenge
        </h4>
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

.question-text {
  color: #ffffff92;
  font-style: italic;
  font-family: 'Nunito', sans-serif;
  text-align: center;
  margin-top: 12.5%;
  user-select: none; 
}
  
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  height: 10%;
  text-align: center; 
}

button {
  user-select: none;
  padding: 15px 30px;
  font-size: 16px;
  font-family: 'Nunito', sans-serif;
  border: 1px solid transparent;
  border-radius: 30px;
  cursor: pointer;
  background-color: #0f243f;
  color: #ffffff66;
  transition: background-color 0.3s ease, border 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.8);
  text-align: center; 
}

button:hover {
  background-color: #162f4f;
  color: #ffffffaa;
  box-shadow: 0px 6px 8px rgba(19, 156, 161, 0.4);
  border: 1px solid #ffffff;
}

button:active {
  transform: scale(0.98);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}
  
.website-details {
  color: #948e8e;
  font-family: 'Nunito', sans-serif;
  text-align: center;
  margin-top: 0;
  user-select: none;
  font-weight: 300;
  letter-spacing: 0.5px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); 
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%); 
  width: 100%;
  box-sizing: border-box; 
  padding: 10px;
}

.website-details h4 {
  font-weight: 200;
  font-style: italic;
}

</style>