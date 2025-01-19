<template>
  <div class="summary-container">
    <h1>Summary of Your Responses</h1>

    <div v-if="loadingMainGoal || loadingDetailedSummary">
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

    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>
  </div>
</template>


<script>
export default {
  name: "SummaryPage",
  data() {
    return {
      mainGoal: "",
      detailedSummary: "",
      loadingMainGoal: true,
      loadingDetailedSummary: true,
      error: "",
      testMode: true,
    };
  },
  async mounted() {
    if (this.testMode) {
      this.mainGoal = "Creating a mobile game";
      this.detailedSummary = "A 2D action game where players defend their base against waves of enemies.";
      this.loadingMainGoal = false;
      this.loadingDetailedSummary = false;
      return;
    }

    try {
      //Fetch the main goal
      const mainGoalResponse = await fetch('http://localhost:5000/api/generate', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: 'mainGoal' }),
      });

      if (!mainGoalResponse.ok) {
        throw new Error("Failed to fetch the main goal");
      }
      
      const mainGoalData = await mainGoalResponse.json();

      if (mainGoalData.response) {
        this.mainGoal = mainGoalData.response;
        this.loadingMainGoal = false;
      }
      else {
        throw new Error("Invalid response from API for main goal");
      }

      // Fetch the detailed summary
      const detailedSummaryResponse = await fetch('http://localhost:5000/api/generate', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: 'summary' }),
      });

      if (!detailedSummaryResponse.ok) {
        throw new Error("Failed to fetch the detailed summary");
      }

      const detailedSummaryData = await detailedSummaryResponse.json();

      if (detailedSummaryData.response) {
        this.detailedSummary = detailedSummaryData.response;
        this.loadingDetailedSummary = false;
      }
      else {
        throw new Error("Invalid response from API for detailed summary");
      }
   

    } catch (error) {
      console.error("Error:", error.message);
      this.summary = "Unable to fetch the summary data.";
    }
  },
  methods: {
    navigateToSite() {
      this.$router.push({ name: "main" });
    },
  }
};
</script>

<style scoped>
/* Keep your existing styles */
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

.error-message {
  color: #ff4d4d;
  font-size: 1.2rem;
  margin-top: 20px;
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
  z-index: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
  transition: 700ms;
  background: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(24, 79, 183) 46%, rgb(6, 21, 141) 100%);
  padding: 30px 20px 0px 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  /* This line causes a bug. While it makes the card "appear" around the text, in reality it doesn't change the canvas so the corners
  aren't updated. */
  height: fit-content;
}

.subtitle {
  transform: translateY(10px);
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

.tracker:hover ~ #card {
  transition: 300ms;
  filter: brightness(1.1);
}

.tracker:hover ~ #card .title {
  opacity: 1;
}

#prompt {
  bottom: 8px;
  left: 12px;
  z-index: 20;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  max-width: 110px;
  color: rgb(255, 255, 255);
}

.canvas {
  perspective: 800px;
  inset: 0;
  z-index: 200;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 0px;
  grid-template-areas: 
    "tr-1 tr-2 tr-3 tr-4 tr-5"
    "tr-6 tr-7 tr-8 tr-9 tr-10"
    "tr-11 tr-12 tr-13 tr-14 tr-15"
    "tr-16 tr-17 tr-18 tr-19 tr-20"
    "tr-21 tr-22 tr-23 tr-24 tr-25";
}

.tr-1 { grid-area: tr-1; }
.tr-2 { grid-area: tr-2; }
.tr-3 { grid-area: tr-3; }
.tr-4 { grid-area: tr-4; }
.tr-5 { grid-area: tr-5; }
.tr-6 { grid-area: tr-6; }
.tr-7 { grid-area: tr-7; }
.tr-8 { grid-area: tr-8; }
.tr-9 { grid-area: tr-9; }
.tr-10 { grid-area: tr-10; }
.tr-11 { grid-area: tr-11; }
.tr-12 { grid-area: tr-12; }
.tr-13 { grid-area: tr-13; }
.tr-14 { grid-area: tr-14; }
.tr-15 { grid-area: tr-15; }
.tr-16 { grid-area: tr-16; }
.tr-17 { grid-area: tr-17; }
.tr-18 { grid-area: tr-18; }
.tr-19 { grid-area: tr-19; }
.tr-20 { grid-area: tr-20; }
.tr-21 { grid-area: tr-21; }
.tr-22 { grid-area: tr-22; }
.tr-23 { grid-area: tr-23; }
.tr-24 { grid-area: tr-24; }
.tr-25 { grid-area: tr-25; }

.tracker {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 500;
}

.tracker:hover {
  cursor: pointer;
}

.tr-1:hover ~ #card { transform: rotateX(20deg) rotateY(-10deg); }
.tr-2:hover ~ #card { transform: rotateX(20deg) rotateY(-5deg); }
.tr-3:hover ~ #card { transform: rotateX(20deg) rotateY(0deg); }
.tr-4:hover ~ #card { transform: rotateX(20deg) rotateY(5deg); }
.tr-5:hover ~ #card { transform: rotateX(20deg) rotateY(10deg); }
.tr-6:hover ~ #card { transform: rotateX(10deg) rotateY(-10deg); }
.tr-7:hover ~ #card { transform: rotateX(10deg) rotateY(-5deg); }
.tr-8:hover ~ #card { transform: rotateX(10deg) rotateY(0deg); }
.tr-9:hover ~ #card { transform: rotateX(10deg) rotateY(5deg); }
.tr-10:hover ~ #card { transform: rotateX(10deg) rotateY(10deg); }
.tr-11:hover ~ #card { transform: rotateX(0deg) rotateY(-10deg); }
.tr-12:hover ~ #card { transform: rotateX(0deg) rotateY(-5deg); }
.tr-13:hover ~ #card { transform: rotateX(0deg) rotateY(0deg); }
.tr-14:hover ~ #card { transform: rotateX(0deg) rotateY(5deg); }
.tr-15:hover ~ #card { transform: rotateX(0deg) rotateY(10deg); }
.tr-16:hover ~ #card { transform: rotateX(-10deg) rotateY(-10deg); }
.tr-17:hover ~ #card { transform: rotateX(-10deg) rotateY(-5deg); }
.tr-18:hover ~ #card { transform: rotateX(-10deg) rotateY(0deg); }
.tr-19:hover ~ #card { transform: rotateX(-10deg) rotateY(5deg); }
.tr-20:hover ~ #card { transform: rotateX(-10deg) rotateY(10deg); }
.tr-21:hover ~ #card { transform: rotateX(-20deg) rotateY(-10deg); }
.tr-22:hover ~ #card { transform: rotateX(-20deg) rotateY(-5deg); }
.tr-23:hover ~ #card { transform: rotateX(-20deg) rotateY(0deg); }
.tr-24:hover ~ #card { transform: rotateX(-20deg) rotateY(5deg); }
.tr-25:hover ~ #card { transform: rotateX(-20deg) rotateY(10deg); }

.noselect {
  user-select: none;
}

.button-33 {
  background-color: #87ceeb;
  border-radius: 100px;
  box-shadow: rgba(0, 123, 255, .2) 0 -25px 18px -14px inset,rgba(0, 123, 255, .15) 0 1px 2px,rgba(0, 123, 255, .15) 0 2px 4px,rgba(0, 123, 255, .15) 0 4px 8px,rgba(0, 123, 255, .15) 0 8px 16px,rgba(0, 123, 255, .15) 0 16px 32px;
  color: #004080;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 30px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-top: 70px;
}

.button-33:hover {
  box-shadow: rgba(0, 123, 255, .35) 0 -25px 18px -14px inset,rgba(0, 123, 255, .25) 0 1px 2px,rgba(0, 123, 255, .25) 0 2px 4px,rgba(0, 123, 255, .25) 0 4px 8px,rgba(0, 123, 255, .25) 0 8px 16px,rgba(0, 123, 255, .25) 0 16px 32px;
  transform: scale(1.05) rotate(-1deg);
}

</style>