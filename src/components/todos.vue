<template lang="html">
    <section class="todos">
        <h1>todos Component</h1>
            <form @submit.prevent="addNewTask">
                <label>New task
                    <input type="text" name="newTask" size="60"
                           v-model="newTask"
                           placeholder="add a new task"
                           required
                    >
                </label>
                <button type="submit">add task</button>
            </form>

            <div class="task-container">
                <div v-if="tasks.length > 0">
                    <input type='radio' name="radio" @click="selectTasks('')" :checked="taskStatusSearch === ''">All tasks<br>
                    <input type='radio' name="radio"  @click="selectTasks(false)">To be done<br>
                    <input type='radio' name="radio" @click="selectTasks(true)">Done
                    <div>
                        <button @click="selectAllTasks(true)">Select all tasks</button>
                        <button @click="selectAllTasks(false)">Deselect all tasks</button>
                        <button @click="removeFinishedTasks">Remove finished tasks</button>
                    </div>
                </div>
                <ul>
                    <li v-for="task in filteredTasks" v-bind:key="task.index" :class="{ taskDone: task.done }">
                        <p>
                            To do : <span contenteditable @input=" event => editTaskDescription(event, task)">{{task.taskDescription}}</span>
                        </p>
                        <div class="control-buttons-container">
                            <label>mark it as done
                                <input type="checkbox"
                                       @click="checkboxClicked(task)"
                                       :checked="task.done"
                                >
                            </label>
                            <button @click="removeTask(task)">remove task</button>
                        </div>
                    </li>
                    <span v-if="!filteredTasks.length">No task to display !</span>
                </ul>
            </div>

            <footer v-if="notDoneTasksNbr">
                <span>Number of tasks to be done : {{notDoneTasksNbr}}</span>
            </footer>
    </section>
</template>

<script lang="js">
    export default  {
        name: 'todos',
        props: [],

        // mounted () {},

        data () {
            return {
                taskStatusSearch: '',
                newTask: '',
                tasks: [],
                notDoneTasksNbr: 0
            }
        },

        methods: {
            addNewTask() {
                this.tasks.push({
                    taskDescription : this.newTask,
                    done: false
                });
                this.newTask = '';
                this.notDoneTasksNbr++;
                this.taskStatusSearch= '';
            },

            removeTask(task) {
                const i = this.tasks.indexOf(task);
                (i > -1) && this.tasks.splice(i, 1);
                this.notDoneTasksNbr--;
            },

            selectTasks(status) {
                this.taskStatusSearch = status;
            },

            checkboxClicked(task) {
                task.done = !task.done;
                this.taskStatusSearch= '';
            },

            selectAllTasks(state) {
                this.tasks.forEach(task => task.done = state);
            },

            removeFinishedTasks() {
                this.tasks = this.tasks.filter( task => !task.done);
            },

            editTaskDescription(event, task) {
                task.taskDescription = event.target.innerText;
            }
        },

        updated() {
            this.notDoneTasksNbr = this.tasks.filter(task => !task.done).length;
        },

        computed: {
            filteredTasks() {
                return this.tasks.filter(task => {
                    if (this.taskStatusSearch === '') return true;
                    return this.taskStatusSearch === task.done;
                })
            }
        }
    }
</script>

<style>
    .taskDone {
        opacity: 0.5;
    }
    .task-container {
        display: flex;
        justify-content: space-around;
        margin-top: 30px;
        margin-bottom: 20px;
    }
    .control-buttons-container {
        display: flex;
        justify-content: space-around;
        border-top: solid 1px #c7c5c5;
    }
    li {
        border: solid 1px grey;
        border-radius: 5px;
        display: flex;
        flex-flow: column;
        padding: 5px;
        width: 300px;
        margin-bottom: 5px;
    }
    li span {
        font-weight: bold;
    }
    ul {
        position: relative;

    }
    footer {
        background: #42b983;
        position: fixed;
        height: 30px;
        bottom: 0;
        width: 100%;
    }
</style>
