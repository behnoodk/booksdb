<template>
  <q-page class="q-pa-lg">
    <q-card>
      <q-card-section>
        <div class="page-title">
          <span v-if="editMode">Edit Book</span>
          <span v-else>Add New Book</span>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="row">
          <div class="col-5">
            <q-input
              class="q-mb-lg"
              filled
              v-model="form.title"
              label="Title"
              :error="$v.form.title.$error"
              error-message="Please enter title"
            />
            <q-select
              class="q-mb-lg"
              filled
              label="Author"
              v-model="form.author_id"
              :options="authorList"
              option-value="id"
              option-label="name"
              emit-value
              map-options
            />
            <q-input
              class="q-mb-lg"
              filled
              v-model="form.isbn"
              label="ISBN"
              :error="$v.form.isbn.$error"
              error-message="Please enter ISBN"
            />
            <q-input
              class="q-mb-lg"
              filled
              v-model="form.cover"
              label="Cover Photo"
              :error="$v.form.cover.$error"
              error-message="Please enter cover photo"
            />
            <q-input
              class="q-mb-lg"
              filled
              v-model="form.year"
              label="Publication Year"
              :error="$v.form.year.$error"
              error-message="Please enter publication year"
            />
            <q-input
              class="q-mb-lg"
              filled
              v-model="form.description"
              label="Description"
              :error="$v.form.description.$error"
              error-message="Please enter description"
              type="textarea"
            />
            <q-btn
              :icon="submitIcon"
              :label="submitLabel"
              color="primary"
              @click="submit"
              :loading="loading"
            />
            <q-btn
              class="q-ml-md"
              label="Back to Book List"
              flat
              :to="{name: 'index'}"
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
        title: '',
        isbn: '',
        author_id: '',
        cover: '',
        year: '',
        description: ''
      }
    }
  },
  validations: {
    form: {
      title: { required },
      isbn: { required },
      author_id: { required },
      cover: { required },
      year: { required },
      description: { required }
    }
  },
  computed: {
    authorList () {
      return this.$store.state.author.list
    },
    bookList () {
      return this.$store.state.book.list
    },
    submitLabel () {
      if (this.editMode) return 'Save Changes'
      return 'Submit'
    },
    submitIcon () {
      if (this.editMode) return 'done'
      return 'add'
    },
    editItem () {
      return this.bookList.find(b => b.id === this.editId)
    }
  },
  methods: {
    async create () {
      this.loading = true
      const payload = Object.assign({}, this.form)
      await this.$store.dispatch('book/create', { payload })
      this.loading = false
      this.$q.notify({
        message: 'New Book created successfully!',
        icon: 'done',
        position: 'top',
        classes: 'app-message-positive',
        timeout: 2000
      })
      this.$router.push({ name: 'index' })
    },
    async update () {
      this.loading = true
      const payload = Object.assign({}, this.form)
      await this.$store.dispatch('book/update', { payload, id: this.editId })
      this.loading = false
      this.$q.notify({
        message: 'Book Info updated successfully!',
        icon: 'done',
        position: 'top',
        classes: 'app-message-positive',
        timeout: 2000
      })
      this.$router.push({ name: 'index' })
    },
    async submit () {
      this.$v.$touch()
      if (this.$v.$invalid) return
      if (this.editMode) this.update()
      else this.create()
    },
    fillEditForm () {
      this.form.title = this.editItem.title
      this.form.author_id = Number(this.editItem.author_id)
      this.form.isbn = this.editItem.isbn
      this.form.cover = this.editItem.cover
      this.form.year = this.editItem.year
      this.form.description = this.editItem.description
    }
  },
  mounted () {
    this.$store.dispatch('author/fetch')
    if (this.$route.name === 'bookedit') {
      this.editMode = true
      this.editId = this.$route.params.id
      this.fillEditForm()
    }
  }
}
</script>
