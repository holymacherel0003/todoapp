<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Todo</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Title">
          <b-input type="text" v-model="editTitle" :value="editTitle" placeholder="Title"></b-input>
        </b-field>
        <b-field label="Detail">
          <b-input type="text" v-model="editDetail" :value="editDetail" placeholder="Detail"></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" v-on:click="editTask()">Complete</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: 'TodoEditor',
  props: {
    'id': Number,
    'title': String,
    'detail': String
  },
  data () {
    return {
      editId: this.id,
      editTitle: this.title,
      editDetail: this.detail
    }
  },
  methods: {
    editTask () {
      this.$emit('edit', {
        'id': this.editId,
        'title': this.editTitle,
        'detail': this.editDetail
      })
    }
  }
}
</script>