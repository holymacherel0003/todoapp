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
		</b-field>
		<section>
      <b-tabs size="is-medium"  position="is-centered" expanded v-model="activeTab">
        <b-tab-item label="Todos" icon="list">
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
          <button class="button is-primary" v-on:click="completeCheckedTodo()">Complete</button>
        </b-tab-item>
          
        <b-tab-item label="Completed" icon="check">
          <b-collapse :open="false" class="card" v-for="task in completeTasks" v-bind:data="task" v-bind:key="task.id">
            <div slot="trigger" slot-scope="props" class="card-header">
              <p class="card-header-title">
                  {{ task.title }}
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
      this.completeTasks.push(context)
      this.tasks = this.tasks.filter((element) => {
        return element.id !== context.id
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
      for (let task of this.tasks) {
        if (task.isChecked) {
          this.completeTodo(task)
        }
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
  
  section {
    button {
      margin: 5px;
    }
  }
}
</style>