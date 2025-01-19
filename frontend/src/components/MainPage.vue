<template>
    <div class="summary-container">
        <h1>Your Path</h1>

        <button class="ideas-btn" @click="notWorking_toggleIdeas">
            {{ isIdeasMode ? 'Show Help' : 'Show Ideas' }}
            <span class="tooltip-btn">
                Not working. You would be able to change the ideas card to the help one. That way
                other people would see that you need help with that task.
            </span>
        </button>

        <div v-if="pathTasks.length > 0">
            <div class="path-container">
                <div 
                    v-for="(task, index) in pathTasks" 
                    :key="task.id" 
                    class="path-step"
                >
                    <div 
                        class="circle" 
                        :style="{ backgroundColor: getTaskColor(task.category) }"
                    >
                        {{ task.id }}
                        <span class="tooltip">{{ task.name }}</span>
                    </div>
                    <div v-if="index < pathTasks.length - 1" class="path-dots"></div>
                </div>
            </div>
        </div>

        <div 
            class="trashcan" 
            @dragover.prevent 
            @drop="deleteTask"
        >
            🗑️
        </div>

        <div class="cards-container">
            <div 
                v-for="(card, index) in cards" 
                :key="index" 
                class="card" 
                :class="card.class"
                @dragover.prevent="allowDrop(index)"
                @drop="onDrop(index)"
            >
                <div class="subtitle">{{ card.title }}</div>
                <div class="separator"></div>

                <div class="task-container">
                    <div 
                        v-for="(task, tIndex) in card.tasks" 
                        :key="task.id" 
                        class="task-item"
                        :draggable="!task.editing"
                        @dragstart="startDrag($event, index, tIndex)"
                        @dragover.prevent
                        @drop="reorderTask(index, tIndex)"
                    >
                        <span v-if="!task.editing" class="task-text" @dblclick="enableEditing(index, tIndex)">
                            {{ task.name }}
                        </span>
                        <input 
                            v-else 
                            v-model="task.name" 
                            @blur="disableEditing(index, tIndex)"
                            @keyup.enter="disableEditing(index, tIndex)"
                            class="task-edit-input"
                        />
                        <span class="edit-icon" @click="enableEditing(index, tIndex)">✏️</span>
                    </div>

                    <input 
                        v-if="card.showInput" 
                        v-model="card.newTask" 
                        @keyup.enter="addTask(index)" 
                        placeholder="Enter task and press Enter" 
                        class="task-input"
                    />
                </div>

                <button class="add-task-btn" @click="toggleInput(index)">+</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  name: 'MainPage',
  data() {
    return {
      cards: JSON.parse(localStorage.getItem('cards')) || [
        { title: "TODO", class: "todo", tasks: [], newTask: "", showInput: false },
        { title: "DOING", class: "doing", tasks: [], newTask: "", showInput: false },
        { title: "FINISHED", class: "finished", tasks: [], newTask: "", showInput: false },
        { title: "IDEAS", class: "ideas", tasks: [], newTask: "", showInput: false }
      ],
      isIdeasMode: true,
      draggedTask: null,
      draggedFromCard: null,
      draggedTaskIndex: null,
      taskCounter: JSON.parse(localStorage.getItem('taskCounter')) || 1, 
    };
  },
  computed: {
    pathTasks() {
        const tasks = this.cards.flatMap(card => 
            card.tasks.map(task => ({
                id: task.id,
                name: task.name,
                category: task.category || card.class
            }))
        ).sort((a, b) => a.id - b.id); 

        console.log("Updated pathTasks:", tasks); // Log computed pathTasks
        return tasks;
    }
  },
  watch: {
    cards: {
      handler(newCards) {
        localStorage.setItem('cards', JSON.stringify(newCards));
      },
      deep: true
    }
  },
  mounted() {
    console.log('Page loaded, generating AI tasks...');
    this.generateIdeasTasks();
  },
  methods: {
    async generateIdeasTasks() {
        try {
            console.log('Fetching AI-generated tasks...');

            const response = await fetch('http://localhost:5000/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'ideas_tasks' }),
            });

            if (!response.ok) {
            throw new Error(`Failed to fetch AI-generated tasks, status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Received response:', data);

            // Check if response contains tasks
            if (data && data.response && Array.isArray(data.response)) {
                const ideasIndex = this.cards.findIndex(card => card.class === 'ideas');
                console.log('Ideas card index:', ideasIndex);

                if (ideasIndex !== -1) {
                    data.response.forEach((task, index) => {
                    const cleanedTask = task.trim();  // Trim spaces

                    this.cards[ideasIndex].tasks.push({
                        id: this.taskCounter++,  
                        name: cleanedTask,  // Use cleaned task
                        editing: false,
                        category: 'ideas'
                    });

                    console.log(`Added task: ${cleanedTask}`);
                    });

                    // Update localStorage
                    localStorage.setItem('cards', JSON.stringify(this.cards));
                    localStorage.setItem('tasksCounter', JSON.stringify(this.taskCounter));

                    console.log('Updated cards with tasks:', this.cards);
                }
                
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error generating tasks:', error.message);
        }
    },
    getTaskColor(category) {
      const colors = {
        todo: "#ff6f61",
        doing: "#ffcc00",
        finished: "#6fdd8b",
        help: "#61a0ff",
        ideas: "#a0a0a0",
      };
      return colors[category] || "#a0a0a0";
    },
    toggleInput(index) {
      this.cards[index].showInput = !this.cards[index].showInput;
    },
    toggleIdeas() {
    const ideasIndex = this.cards.findIndex(card => card.class === 'ideas');
    const helpIndex = this.cards.findIndex(card => card.class === 'help');

    if (this.isIdeasMode && ideasIndex !== -1) {
        // Switch from Ideas to Help
        this.cards[ideasIndex].title = "HELP";
        this.cards[ideasIndex].class = "help";
    } else if (helpIndex !== -1) {
        // Switch from Help to Ideas
        this.cards[helpIndex].title = "IDEAS";
        this.cards[helpIndex].class = "ideas";
    } else {
        console.error("The card was not found in the array.");
        return;
    }

    this.isIdeasMode = !this.isIdeasMode;
    
    // Force reactivity to update
    this.cards = [...this.cards];
    },
    addTask(index) {
        if (this.cards[index].newTask.trim() !== "") {
            this.cards[index].tasks.push({
            id: this.taskCounter, 
            name: this.cards[index].newTask.trim(),
            editing: false,
            category: this.cards[index].class
            });

            this.taskCounter++; 

            localStorage.setItem('taskCounter', JSON.stringify(this.taskCounter));
            localStorage.setItem('cards', JSON.stringify(this.cards));

            this.cards[index].newTask = "";
            this.cards[index].showInput = false;
        }
    },
    enableEditing(cardIndex, taskIndex) {
      this.cards[cardIndex].tasks[taskIndex].editing = true;
    },
    disableEditing(cardIndex, taskIndex) {
      this.cards[cardIndex].tasks[taskIndex].editing = false;
    },
    startDrag(event, cardIndex, taskIndex) {
      this.draggedTask = this.cards[cardIndex].tasks[taskIndex];
      this.draggedFromCard = cardIndex;
      this.draggedTaskIndex = taskIndex;

      const ghostImage = document.createElement('div');
      ghostImage.style.width = '180px';
      ghostImage.style.padding = '10px';
      ghostImage.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      ghostImage.style.border = '1px solid rgba(255, 255, 255, 0.3)';
      ghostImage.style.borderRadius = '5px';
      ghostImage.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
      ghostImage.style.fontSize = '1rem';
      ghostImage.style.color = '#fff';
      ghostImage.style.textAlign = 'left';
      ghostImage.style.fontFamily = 'Nunito, sans-serif';
      ghostImage.innerText = this.draggedTask.name;
      document.body.appendChild(ghostImage);

      event.dataTransfer.setDragImage(ghostImage, ghostImage.offsetWidth / 2, ghostImage.offsetHeight / 2);
      setTimeout(() => document.body.removeChild(ghostImage), 0);

      event.target.classList.add("dragging");
    },
    allowDrop(index) {
      event.preventDefault();
    },
    onDrop(index) {
    if (this.draggedFromCard !== null && this.draggedFromCard !== index) {
        const movedTask = this.cards[this.draggedFromCard].tasks.splice(this.draggedTaskIndex, 1)[0];
        movedTask.category = this.cards[index].class; // Update task category
        this.cards[index].tasks.push(movedTask);
        this.resetDragState();
    }
},
    reorderTask(cardIndex, newIndex) {
      if (this.draggedFromCard === cardIndex && this.draggedTaskIndex !== newIndex) {
        const task = this.cards[cardIndex].tasks.splice(this.draggedTaskIndex, 1)[0];
        this.cards[cardIndex].tasks.splice(newIndex, 0, task);
        this.resetDragState();
      }
    },
    deleteTask() {
      if (this.draggedFromCard !== null) {
        this.cards[this.draggedFromCard].tasks.splice(this.draggedTaskIndex, 1);
        this.resetDragState();
      }
    },
    resetDragState() {
      this.draggedTask = null;
      this.draggedFromCard = null;
      this.draggedTaskIndex = null;
    }
  },
  created() {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem('cards', JSON.stringify(this.cards));
    });
  }
};
</script>


<style scoped>

.summary-container {
    padding: 15px;
    text-align: center;
    color: #fff;
    background-color: #222222;
    font-family: "Nunito", sans-serif;
}
h1 {
    margin: 0;
    font-size: 2rem;
    color: #00b3ff;
}

.cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    gap: 20px;
    padding: 0 10px;
    max-width: 100%;
}

.card {
    flex: 1 1 250px;
    padding: 40px;
    background: #333;
    color: #fff;
    text-align: center;
    font-size: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    height: 300px;
    position: relative; 
    max-width: 350px;
}

.todo { 
    background-color: #ff6f61; 
    user-select: none;
}
.doing { 
    background-color: #ffcc00; 
    user-select: none;
}
.finished { 
    background-color: #6fdd8b; 
    user-select: none;
}
.help { 
    background-color: #61a0ff;
    user-select: none; 
}

.subtitle {
    color: rgb(255, 255, 255);
    text-align: center;
    font-size: 1.45rem;
    font-weight: 300;
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    display: inline-block;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.separator {
    width: 100%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.5);
    margin-left: 0px;
    margin-bottom: 20px;
}

.task-container {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-top: 10px;
    max-height: 150px;
    scrollbar-width: none;
    position: relative;
}

.task-container::-webkit-scrollbar {
    display: none;
}

.task-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 8px;
    margin-bottom: 5px;
    border-radius: 5px;
    font-size: 1rem;
    text-align: left;
    border: 1px solid rgba(255, 255, 255, 0.3);
    user-select: none;
    cursor: grab;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s ease-in-out;
}

.task-item:active {
    cursor: grabbing; 
}

.task-text {
    flex-grow: 1;
    padding-right: 10px;
    color: #fff;
    cursor: pointer;
}

.task-edit-input {
    width: 100%;
    padding: 5px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    outline: none;
    font-family: "Nunito", sans-serif;
}

.edit-icon {
    cursor: pointer;
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.3s ease;
}

.edit-icon:hover {
    color: #00b3ff;
}

.task-item.dragging {
    opacity: 0.7;
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
    cursor: grabbing;
}

.task-container.drag-over {
    border: 2px dashed rgba(255, 255, 255, 0.5);
}

.task-input {
    width: 100%; 
    padding: 8px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    font-size: 1rem;
    background: rgba(135, 136, 133, 0.656);
    color: #fff;
    outline: none;
    align-self: center;
    margin-top: 0;
    box-sizing: border-box; 
}

.task-input::placeholder {
    color: rgba(255, 255, 255, 0.6); 
    font-style: italic;
}

.add-task-btn {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px 12px;
    font-size: 1.2rem;
    border: none;
    background: #00b3ff;
    color: white;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out;
    user-select: none;
}

.add-task-btn:hover {
    background: #008ac9;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    transform: translateX(-50%) scale(1.05);
}

.trashcan {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 2rem;
    color: #ff4d4d;
    cursor: pointer;
    transition: transform 0.3s ease, opacity 0.3s ease;
    user-select: none;
}

.trashcan:hover {
    transform: scale(1.1);
    opacity: 0.8;
}

/* Path Visualation */

.path-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    user-select: none;
    margin-top: 80px;
    width: 100%;
    max-width: 100%;
}

.path-step {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 10px;
}

.circle {
    width: 80px;  
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.5rem;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    text-align: center;
}

.circle .tooltip {
    visibility: hidden;
    width: 120px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    text-align: center;
    padding: 5px;
    border-radius: 5px;
    position: absolute;
    bottom: 110%;
    left: 40%;
    transform: translateX(-50%);
    font-size: 0.9rem;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.circle:hover .tooltip {
    visibility: visible;
    opacity: 1;
}

.path-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 15px;
}

.path-dots::before,
.path-dots::after {
    content: '';
    width: 5px;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    margin: 0 3px;
}

.ideas-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    font-size: 1.2rem;
    border: none;
    background: #7a52a1;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.ideas-btn:hover {
    background: #5a3b7e;
}

.circle .tooltip {
    visibility: hidden;
    width: 120px;
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 8px;
    border-radius: 5px;
    border: 2px solid #00b3ff;
    position: absolute;
    bottom: 110%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.9rem;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.circle:hover .tooltip {
    visibility: visible;
    opacity: 1;
}

.tooltip-btn {
    visibility: hidden;
    width: 150px;
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 8px;
    border-radius: 5px;
    position: absolute;
    top: 100%;  /* Change from bottom: 100% to top: 100% */
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.9rem;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border: 2px solid #00b3ff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    margin-top: 5px;  /* Add some space between button and tooltip */
}

.ideas-btn:hover .tooltip-btn {
    visibility: visible;
    opacity:1;
}

</style>