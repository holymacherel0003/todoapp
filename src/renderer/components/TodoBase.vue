<template>
  <div class="todo">
    <b-modal :active.sync="isComponentModalActive " has-modal-card>
      <todo-editor v-bind="editorProps" v-on:edit="completeEdit"></todo-editor>
    </b-modal>
		<b-field>
			<b-input v-model="text" minlength="1" maxlength="30" placeholder="Input Task Title"></b-input>
			<p class="control">
				<button	class="button is-primary" v-on:click="addTodo()">＋</button>
			</p>
      <a class="button is-danger init-button" @click="confirmInitialize">
        <span class="icon is-small">
          <i class="fa fa-times-circle"></i>
        </span>
        <span>Init All List</span>
      </a>
		</b-field>
		<section>
      <b-tabs size="is-medium" position="is-centered" expanded v-model="activeTab">
        <b-tab-item label="Todos" icon="list">
          <a class="button is-success is-small top-button" v-on:click="completeCheckedTodo()">
            <span class="icon is-small">
              <i class="fa fa-check"></i>
            </span>
            <span>Complete</span>
          </a>
          <a class="button is-success is-small top-button" @click="confirmCompleteAllTasks">
            <span class="icon is-small">
              <i class="fa fa-check"></i>
            </span>
            <span>Complete All</span>
          </a>
          <b-collapse class="card" :open="true" v-for="task in tasks" v-bind:data="task" v-bind:key="task.id">
            <div slot="trigger" slot-scope="props" class="card-header">
              <p class="card-header-title" >
                <b-checkbox v-model="task.isChecked">
                  {{ task.title }}
                </b-checkbox>
              </p>
              <a class="card-header-icon">
                <b-icon
                    :icon="props.open ? 'angle-up' : 'angle-down'">
                </b-icon>
              </a>
            </div>
            <div class="card-content">
              <div class="content">
                {{ task.detail }}
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" v-on:click="completeTodo(task)">Complete</a>
              <a class="card-footer-item" v-on:click="editTodo(task)">Edit</a>
            </footer>
          </b-collapse>
        </b-tab-item>
          
        <b-tab-item label="Completed" icon="check">
          <a class="button is-danger is-small top-button" v-on:click="deleteCheckedCompletedTodo()">
            <span class="icon is-small">
              <i class="fa fa-trash"></i>
            </span>
            <span>Delete</span>
          </a>
          <a class="button is-danger is-small top-button" @click="confirmDeleteAllCompletedTasks">
            <span class="icon is-small">
              <i class="fa fa-trash"></i>
            </span>
            <span>Delete All</span>
          </a>
          <b-collapse :open="false" class="card" v-for="task in completeTasks" v-bind:data="task" v-bind:key="task.id">
            <div slot="trigger" slot-scope="props" class="card-header">
              <p class="card-header-title">
                <b-checkbox v-model="task.isChecked">
                  {{ task.title }}
                </b-checkbox>
              </p>
              <a class="card-header-icon">
                <b-icon
                    :icon="props.open ? 'angle-up' : 'angle-down'">
                </b-icon>
              </a>
            </div>
            <div class="card-content">
              <div class="content">
                {{ task.detail }}
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" v-on:click="uncompleteTodo(task)">Uncomplete</a>
              <a class="card-footer-item" v-on:click="deleteTodo(task)">Delete</a>
            </footer>
          </b-collapse>
        </b-tab-item>
      </b-tabs>
		</section>
  </div>
</template>

<script>
import TodoEditor from '@/components/TodoEditor'

export default {
  name: 'ToDo',
  components: {
    'todo-editor': TodoEditor
  },

  data () {
    return {
      activeTab: 0,
      text: '',
      id: 1,
      isComponentModalActive: false,
      tasks: [],
      completeTasks: [],
      editorProps: {
        id: 0,
        title: '',
        detail: ''
      }
    }
  },

  mounted () {
    this.id = localStorage.getItem('id')
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || []
    this.completeTasks = JSON.parse(localStorage.getItem('completeTasks')) || []
  },

  methods: {
    initializeTodo () {
      this.id = 1
      this.tasks = []
      this.completeTasks = []
      this.setItems()
    },

    addTodo () {
      const addData = {
        id: this.id,
        title: this.text,
        detail: '',
        isChecked: false
      }
      this.tasks.push(addData)
      this.id++
      this.text = ''
      this.setItems()
    },

    completeTodo (context) {
      context.isChecked = false
      this.completeTasks.push(context)
      this.tasks = this.tasks.filter((element) => {
        return element.id !== context.id
      })
      this.setItems()
    },

    completeAllTodo () {
      for (let task of this.tasks) {
        this.completeTodo(task)
      }
      this.$toast.open({
        message: `Completed All Tasks!`,
        type: 'is-success',
        position: 'is-bottom'
      })
      this.setItems()
    },

    uncompleteTodo (context) {
      this.tasks.push(context)
      this.completeTasks = this.completeTasks.filter((element) => {
        return element.id !== context.id
      })
      this.setItems()
    },

    completeCheckedTodo () {
      let count = 0
      for (let task of this.tasks) {
        if (task.isChecked) {
          task.isChecked = false
          this.completeTodo(task)
          count++
        }
      }
      if (count !== 0) {
        this.completeToast(count)
      }
      this.setItems()
    },

    editTodo (context) {
      this.editorProps.id = context.id
      this.editorProps.title = context.title
      this.editorProps.detail = context.detail
      this.isComponentModalActive = true
    },

    completeEdit (editedTask) {
      this.tasks.filter((element) => { return element.id === editedTask.id })[0].title = editedTask.title
      this.tasks.filter((element) => { return element.id === editedTask.id })[0].detail = editedTask.detail
      this.isComponentModalActive = false
      this.setItems()
    },

    deleteTodo (context) {
      this.tasks = this.tasks.filter((element) => {
        return element.id !== context.id
      })
      this.completeTasks = this.completeTasks.filter((element) => {
        return element.id !== context.id
      })
      this.setItems()
    },

    deleteCheckedCompletedTodo () {
      let count = 0
      for (let task of this.completeTasks) {
        if (task.isChecked) {
          this.deleteTodo(task)
          count++
        }
      }
      if (count !== 0) {
        this.deleteToast(count)
      }
      this.setItems()
    },

    deleteAllCompletedTodo () {
      this.completeTasks = []
      this.$toast.open({
        message: `Deleted All Completed Tasks!`,
        type: 'is-danger',
        position: 'is-bottom'
      })
      this.setItems()
    },

    completeToast (count) {
      this.$toast.open({
        message: `Completed ${count} Tasks!`,
        type: 'is-success',
        position: 'is-bottom'
      })
    },

    deleteToast (count) {
      this.$toast.open({
        message: `Deleted ${count} Tasks!`,
        type: 'is-success',
        position: 'is-bottom'
      })
    },

    confirmInitialize () {
      this.$dialog.confirm({
        title: 'Initialize',
        message: 'This action will reset all tasks list. Are you sure you want to continue this action?',
        confirmText: 'Initialize',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.initializeTodo()
      })
    },

    confirmCompleteAllTasks () {
      this.$dialog.confirm({
        message: 'Are you sure you want to complete all tasks?',
        onConfirm: () => this.completeAllTodo()
      })
    },

    confirmDeleteAllCompletedTasks () {
      this.$dialog.confirm({
        title: 'Deleting All Tasks',
        message: 'Are you sure you want to <b>delete</b> all completed tasks? This action cannot be undone.',
        confirmText: 'Delete',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteAllCompletedTodo()
      })
    },

    setItems () {
      localStorage.setItem('id', this.id)
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
      localStorage.setItem('completeTasks', JSON.stringify(this.completeTasks))
    }
  }
}
</script>

<style scoped lang="scss">
.todo {
  width: 600px;
  margin: auto;
  padding: 20px 5px;

  .init-button {
      margin-left: 20px;
  }
  
  section {
    .top-button {
      margin-bottom: 10px;
    }
  }
}
</style>