<template>
  <div>
    <router-view></router-view>
  </div>
  <div class="main-text">
    <h3>You can't always stick to the past
    <br>You can't always think about the future. 
    <br>But you can think of the present.
    <br><br><br><p>So tell me, what are you waiting for?</p>
    </h3>
  </div>
  <div class="button-container">
    <button data-id="start">Start your goal now</button>
    <button>Help others start their goal</button>
  </div>
  <div class = "website-details">
    <h1>YourPath.</h1>
    <h3>YourPath is a website that can help you achieve what you always want to. 
    <br>It uses AI to help you start your journey but AI won't finish it.
    <br>It only clears the first part of your path, not the whole.
    <br>And if you have already figured it out. 
    <br>You can help others start their journey too.
    </h3>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    //The glow effect from the mouse
    const glow = document.createElement('div');
    glow.classList.add('glow');
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });

    //Fire spark effect
    const createSpark = (x, y) => {
      const spark = document.createElement('div');
      spark.classList.add('spark');

      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 100; 
      const size = Math.random() * 5 + 2; 

      spark.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
      spark.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;

      document.body.appendChild(spark);

      spark.addEventListener('animationend', () => spark.remove());
    };

    //Listener for mouse clicks
    document.addEventListener('click', (e) => {
      for (let i = 0; i < 15; i++) {
        createSpark(e.clientX, e.clientY); 
      }
    });
    // Light explosion effect
    const startButton = document.querySelector('button[data-id="start"]');
    startButton.addEventListener('click', () => {
      const explosion = document.createElement('div');
      explosion.classList.add('light-explosion');
      document.body.appendChild(explosion);

      //Remove explosion after animation and redirect
      setTimeout(() => {
        explosion.remove();
        window.location.href = '/questions'; 
        }, 1500); 
      });
  },
};
</script>


<style>

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #1a1a1a;
}

.glow {
  position: absolute;
  width: 100px; 
  height: 100px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.10) 0%, rgba(0, 0, 0, 0) 50%);
  pointer-events: none; 
  mix-blend-mode: screen;
  transform: translate(-50%, -50%);
}

.spark {
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: orange;
  border-radius: 50%;
  pointer-events: none;
  animation: spark-animation 0.8s ease-out forwards;
}

@keyframes spark-animation {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--x), var(--y)) scale(0.5);
    opacity: 0;
  }
}

.main-text {
  color: #ffffff92;
  font-style: italic;
  font-family: 'Nunito', sans-serif;
  text-align: center;
  margin-top: 50px;
  user-select: none; 
}

/* Buttons */

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
  font-family: 'Nunito', sans-serif;
  box-shadow: 0px 6px 8px rgba(19, 156, 161, 0.596);
}

/* Website Details */
.website-details {
  color: #228d91db;
  font-family: 'Nunito', sans-serif;
  text-align: center;
  margin-top: 250px;
  user-select: none;
}

/* Animation for first button */
.light-explosion {
  position: fixed;
  top: 50%;
  left: 48.8%; 
  width: 10px; 
  height: 10px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.348) 0%, rgba(255, 255, 255, 0.348) 70%);
  border-radius: 50%;
  opacity: 0%;
  z-index: 9999;
  animation: explosion 3s ease-out forwards;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

@keyframes explosion {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(250);
  }
  100% {
    opacity: 1;
    transform: scale(1); 
  }
}


</style>