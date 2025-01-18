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
          <label for="q-answer" class="q-form__label">Answer</label>
          <button class="q-submit-button" @click="submitAnswer">></button>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'Questions',
  data() {
    return {
      userInput: "", // Stores the user's input
    };
  },
  methods: {
    submitAnswer() {
        if (this.userInput.trim()) {
            console.log("User Answer:", this.userInput); // Replace with your logic
            this.userInput = ""; // Clear the input after submission

            // Explicitly blur the input to reset placeholder state
            const inputElement = document.getElementById("q-answer");
            if (inputElement) {
                inputElement.value = ""; // Clear the DOM value
                inputElement.blur(); // Trigger placeholder behavior
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
</style>