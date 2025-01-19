<template>
  <div class="summary-container">
    <h1>Summary of Your Responses</h1>

    <div v-if="loading">
      <p>Loading your responses...</p>
    </div>

    <div v-else class="container noselect">
      <div class="canvas">
        <div v-for="n in 25" :key="n" :class="`tracker tr-${n}`"></div>
        <div id="card">
          <div class="title">Your goal:</div>
          <div class="subtitle">{{ mainGoal }}</div>
          <div class="title">Details:</div>
          <div class="subtitle">{{ detailedSummary }}</div>
        </div>
      </div>
    </div>
    
    <button class="button-33" @click="navigateToSite">Confirm</button>
  </div>
</template>

<script>
export default {
  name: "SummaryPage",
  data() {
    return {
      mainGoal: "Example Goal",
      detailedSummary: "Example Description.",
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    navigateToSite() {
      this.$router.push({
        name: "MainPage",
        query: { loadAITasks: true }
      });
    },
  }
};
</script>

<style scoped>
.summary-container {
  padding: 20px;
  text-align: center;
  color: #fff;
  background-color: #222222;
  font-family: "Nunito", sans-serif;
}

h1 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #00b3ff;
}

.container {
  position: relative;
  width: 100%;
  max-width: 350px;
  min-height: 300px;
  height: auto;
  margin: 0 auto;
  transition: 200ms;
}

#card {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
  transition: 700ms;
  background: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(24, 79, 183) 46%, rgb(6, 21, 141) 100%);
  padding: 30px 20px 0px 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  height: fit-content;
}

.subtitle {
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 1.2rem;
  font-weight: 300;
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-bottom: 50px;
  word-wrap: break-word;
}

.title {
  font-size: x-large;
  font-weight: bold;
  color: white;
}

.button-33 {
  background-color: #87ceeb;
  border-radius: 100px;
  box-shadow: rgba(0, 123, 255, .2) 0 -25px 18px -14px inset,
              rgba(0, 123, 255, .15) 0 1px 2px,
              rgba(0, 123, 255, .15) 0 2px 4px,
              rgba(0, 123, 255, .15) 0 4px 8px,
              rgba(0, 123, 255, .15) 0 8px 16px,
              rgba(0, 123, 255, .15) 0 16px 32px;
  color: #004080;
  cursor: pointer;
  display: inline-block;
  font-family: "CerebriSans-Regular", -apple-system, system-ui, Roboto, sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 30px;
  user-select: none;
  margin-top: 200px;
}

.button-33:hover {
  box-shadow: rgba(0, 123, 255, .35) 0 -25px 18px -14px inset,
              rgba(0, 123, 255, .25) 0 1px 2px,
              rgba(0, 123, 255, .25) 0 2px 4px,
              rgba(0, 123, 255, .25) 0 4px 8px,
              rgba(0, 123, 255, .25) 0 8px 16px,
              rgba(0, 123, 255, .25) 0 16px 32px;
  transform: scale(1.05) rotate(-1deg);
}
</style>
