<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // The glow effect from the mouse
    const glow = document.createElement('div');
    glow.classList.add('glow');
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });

    // Fire spark effect
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

    // Listener for mouse clicks
    document.addEventListener('click', (e) => {
      for (let i = 0; i < 15; i++) {
        createSpark(e.clientX, e.clientY);
      }
    });
  },
};
</script>

<style>
html, body {
  zoom: 1;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #222222;
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

.light-explosion {
    position: fixed;
    top: 50%;
    left: 50%;
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
      transform: translate(-50%, -50%) scale(500);
    }
  }
</style>