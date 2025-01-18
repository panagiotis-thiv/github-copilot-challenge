<template>
    <div class="q-container">
      <div class="q-form__group field">
        <div class="q-input-container">
          <input
            type="q-input"
            class="q-form__field"
            placeholder="q-Answer"
            name="q-answer"
            id="q-answer"
            required
            autocomplete="off"
            v-model="userInput"
            @keyup.enter="submitAnswer"
          />
          <label for="q-answer" class="q-form__label">{{ question }}</label>
          <button class="q-submit-button" @click="submitAnswer">></button>
        </div>
      </div>
      <div class="q-tip">
        <h2>{{ currentTip }}</h2>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Questions',
  data() {
    return {
      userInput: "", 
      tips: [
        "Focus on one goal at a time.",
        "Think about what truly matters to you.",
        "Small steps lead to big changes.",
        "Be specific with your goals to make them achievable.",
        "Consistency is the key to success.",
      ],
      currentTip: "Explain what you want to achieve, create, build. It could be something like making a game or even getting into sports.", 
      question: "What's your goal?",
      questionCount: 0,
      maxQuestions: 4,
    };
  },
  methods: {
    async submitAnswer() {
      if (this.userInput.trim()) {
        this.questionCount++;

        try {
          // Send user input to the backend API
          const response = await fetch('http://localhost:5000/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({prompt: this.userInput }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch the next question');
          }

          const data = await response.json();
          if (data.response) {
            this.question = data.response;
          } 
          else {
            throw new Error("Invalid response from API");
          }

          if (this.questionCount >= this.maxQuestions) {
            this.$router.push({ name: 'SummaryPage' });
          }

        } catch (error) {
          console.error("Error:", error.message);
        }

        // Clear the input field after submission
        this.userInput = ""; 
        const inputElement = document.getElementById("q-answer");
        if (inputElement) {
          inputElement.blur(); 
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
$primary: #117599;
$secondary: #387bef;
$white: #fff;
$gray: #9b9b9b;

.q-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #222222;
  font-family: 'Poppins', sans-serif;
  color: $white;
}

.q-form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: -100px;
  width: 50%;
  user-select: none;
}

.q-form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid $gray;
  outline: 0;
  font-size: 1.3rem;
  color: $white;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .q-form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
    color: $gray;
  }
}

.q-submit-button {
  position: absolute;
  right: -15px;
  padding: 5px 15px;
  border: none;
  background-color: transparent;
  color: $white;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
  transition: background-color 0.3s;

  &:hover {
    color: $secondary;
  }
}

.q-form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s ease-in-out;
  font-size: 1rem;
  color: $gray;
  user-select: none;
}

.q-form__field:focus {
  ~ .q-form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $primary;
    font-weight: 700;
  }
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, $primary, $secondary);
  border-image-slice: 1;
}


.q-form__field {
  &:required,
  &:invalid {
    box-shadow: none;
  }
}


//Tip Message
.q-tip {
  user-select: none;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: $gray;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  opacity: 0.8;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 0.8;
    transform: translateX(-50%);
  }
}

</style>