<template>
  <div class="todo">
    <b-modal :active.sync="isComponentModalActive " has-modal-card>
    </b-modal>
		<b-field>
			<b-input v-model="text" minlength="1" maxlength="30" placeholder="Add Task"></b-input>
			<p class="control">
				<button	class="button is-primary" v-on:click="addTodo()">＋</button>
			</p>
		</b-field>
		<section>
			<b-collapse class="card" v-for="task in tasks" v-bind:data="task" v-bind:key="task.id" v-bind:class="{'complete': task.complete}">
				<div slot="trigger" slot-scope="props" class="card-header">
          <p class="card-header-title">
              {{ task.title }}
          </p>
          <a class="card-header-icon">
            <b-icon
                :icon="props.open ? 'menu-down' : 'menu-up'">
            </b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="content">
            {{ task.detail }}
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" 
            v-model="task.complete" 
            v-on:click="toggleComplete(task)">
              {{ task.complete ? 'Uncomplete' : 'Complete' }}
            </a>
          <a class="card-footer-item" v-on:click="editTodo()">Edit</a>
          <a class="card-footer-item">Delete</a>
        </footer>
			</b-collapse>
		</section>
  </div>
</template>

<script>
export default {
  name: 'ToDo',
  data () {
    return {
      text: '',
      id: 1,
      isComponentModalActive: false,
      tasks: [
        {
          id: 0,
          title: 'タスク1',
          detail: 'hogehogehoge',
          complete: false
        }
      ]
    }
  },

  methods: {
    addTodo () {
      const addData = {
        id: this.id,
        title: this.text,
        detail: '',
        complete: false
      }
      this.tasks.push(addData)
      this.id++
      this.text = ''
    },
    toggleComplete (context) {
      if (context.complete) {
        context.complete = false
      } else {
        context.complete = true
      }
    },
    editTodo () {
      this.isComponentModalActive = true
    }
  }
}
</script>

<style scoped lang="scss">
.todo {
  width: 500px;
  margin: auto;
  padding: 20px 5px;

  .complete {
    background: #ccc;
    color: #666;
  }
}
</style>