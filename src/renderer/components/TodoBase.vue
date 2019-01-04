<template>
  <div class="todo">
		<b-field>
			<b-input v-model="text" minlength="1" maxlength="30" placeholder="Add Task"></b-input>
			<p class="control">
				<button	class="button is-primary" v-on:click="add()">＋</button>
			</p>
		</b-field>
		<section>
			<div class="field" v-for="task in tasks" v-bind:data="task" v-bind:key="task.text">
				<p>
					{{ task.message }}
				</p>
			</div>
		</section>
  </div>
</template>

<script>
export default {
  name: 'ToDo',
  data () {
    return {
      text: '',
      tasks: [
        { message: 'タスク１' },
        { message: 'タスク２' }
      ]
    }
  },

  methods: {
    add () {
      const addData = { message: this.text }
      this.tasks.push(addData)
      this.text = ''
    }
  }
}
</script>

<style scoped lang="scss">
.todo {
  width: 500px;
  margin: auto;
  padding: 20px 5px;
}
</style>