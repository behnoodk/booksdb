<template>
  <q-page class="q-pa-lg">
    <q-card>
      <q-card-section>
        <div class="page-title">
          <span v-if="editMode">Edit Author</span>
          <span v-else>Add New Author</span>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row">
          <div class="col-5">
            <q-input
              filled
              v-model="form.name"
              label="Author Name"
              :error="$v.form.name.$error"
              error-message="Please enter author's name"
            />
            <q-btn
            class="q-mt-lg"
            :icon="submitIcon"
            :label="submitLabel"
            color="primary"
            @click="submit"
            :loading="loading"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      loading: false,
      editMode: false,
      editId: '',
      form: {
        name: ''
      }
    }
  },
  validations: {
    form: {
      name: {
        required
      }
    }
  },
  computed: {
    editItem () {
      return this.authorList.find(a => a.id === this.editId)
    },
    submitLabel () {
      if (this.editMode) return 'Save Changes'
      return 'Submit'
    },
    submitIcon () {
      if (this.editMode) return 'done'
      return 'add'
    },
    authorList () {
      return this.$store.state.author.list
    }
  },
  methods: {
    async create () {
      this.loading = true
      const payload = { name: this.form.name }
      await this.$store.dispatch('author/create', { payload })
      this.loading = false
      this.$q.notify({
        message: 'New Author created successfully!',
        icon: 'done',
        position: 'top',
        classes: 'app-message-positive',
        timeout: 2000
      })
      this.$router.push({ name: 'authors' })
    },
    async update () {
      this.loading = true
      const payload = { name: this.form.name }
      await this.$store.dispatch('author/update', { payload, id: this.editId })
      this.loading = false
      this.$q.notify({
        message: 'Author updated successfully!',
        icon: 'done',
        position: 'top',
        classes: 'app-message-positive',
        timeout: 2000
      })
      this.$router.push({ name: 'authors' })
    },
    async submit () {
      this.$v.$touch()
      if (this.$v.$invalid) return
      if (this.editMode) this.update()
      else this.create()
    },
    fillEditForm () {
      this.form.name = this.editItem.name
    }
  },
  mounted () {
    this.$store.dispatch('author/fetch')
    if (this.$route.name === 'authoredit') {
      this.editMode = true
      this.editId = this.$route.params.id
      this.fillEditForm()
    }
  }
}
</script>
