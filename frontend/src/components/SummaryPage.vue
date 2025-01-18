<template>
<div class="summary-container">
    <h1>Summary of Your Responses</h1>
    <p v-if="summary">{{ summary }}</p>
    <p v-else>Loading your summary...</p>
</div>
</template>

<script>
export default {
  name: "SummaryPage",
  data() {
    return {
      summary: "", // Store the final summary
    };
  },
  async mounted() {
    try {
        const response = await fetch('http://localhost:5000/api/generate', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const data = await response.json();
      this.summary = data.summary;
    } catch (error) {
      console.error("Error generating summary:", error.message);
      this.summary = "Unable to generate the summary at this time.";
    }
  },
};
</script>

<style scoped>

.summary-container {
    padding: 20px;
    text-align: center;
    color: #fff;
    background-color: #222222;
    font-family: "Poppins", sans-serif;
}

h1 {
    margin-bottom: 20px;
}

p {
    font-size: 1.2rem;
    color: #aaa;
}

</style>