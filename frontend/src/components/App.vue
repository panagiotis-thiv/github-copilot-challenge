<template>
  <div class="container">
    <h1>Sample Text</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');

.container {
  background-color: #1a1a1a; /* Slightly lighter than absolute black */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Nunito', sans-serif;
}

h1 {
  color: #ffffff;
  margin-top: 20px;
}
</style>