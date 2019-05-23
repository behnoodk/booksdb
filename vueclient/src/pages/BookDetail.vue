<template>
  <q-page class="q-pa-lg">
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div
            class="col-auto"
            style="width:160px"
          >
            <q-img
              v-if="book.cover"
              :src="book.cover"
              spinner-color="white"
              transition="slide-right"
              style="max-width:150px"
            />
          </div>
          <div class="col">
            <div style="font-size: 26px;font-weight:300">{{book.title}}</div>
            <div
              class="q-pt-md"
              style="font-size: 16px"
              v-if="Object.keys(authorList).length > 0"
            >Author: {{authorList[book.author_id].name}}</div>
            <div
              class="q-pt-md"
              style="font-size: 16px"
            >Publication Year: {{book.year}}</div>
            <div
              class="q-pt-md"
              style="font-size: 16px"
            >ISBN: {{book.isbn}}</div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div
          class="q-pa-lg"
          style="font-size: 18px"
        >
          {{book.description}}
        </div>
      </q-card-section>
      <q-card-section>
        <div
          class="q-pa-lg"
          style="font-size:20px"
        >
          <q-icon
            name="comment"
            size="24px"
          />
          COMMENTS ({{commentList.length}})
        </div>
        <div
          class="q-pa-lg"
          style="max-width:500px"
        >
          <div
            v-for="c in commentList"
            :key="c.id"
            class="q-pa-md"
          >
            <div class="row">
              <div class="col-auto">
                <span style="font-weight:bold">{{c.name}}</span>
                <span class="q-pl-md text-caption">{{c.created_at}}</span>
              </div>
              <div class="col"></div>
              <div class="col-auto self-center">
                <q-btn
                  v-if="isLoggedIn"
                  flat
                  round
                  icon="delete"
                  color="negative"
                  size="10px"
                  @click="deleteComment(c.id)"
                  :loading="deleteLoading[c.id]"
                >
                  <q-tooltip>Delete Comment</q-tooltip>
                </q-btn>
              </div>
            </div>
            <div class="q-pl-sm q-py-sm">
              {{c.comment}}
            </div>
            <q-separator />
          </div>
        </div>
        <div
          class="q-pa-lg"
          style="max-width:400px"
        >
          <q-input
            filled
            v-model="form.name"
            label="Name"
            :error="$v.form.name.$error"
            error-message="Please enter your name"
            class="q-mb-lg"
          />
          <q-input
            filled
            v-model="form.comment"
            label="Comment"
            :error="$v.form.comment.$error"
            error-message="Please enter your comment"
            type="textarea"
            class="q-mb-lg"
          />
          <q-btn
            icon="add_comment"
            label="Send"
            color="primary"
            @click="submit"
            :loading="loading"
          />
        </div>
      </q-card-section>
      <q-separator />
    </q-card>
  </q-page>
</template>
<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      loading: false,
      deleteLoading: {},
      form: {
        name: '',
        comment: ''
      }
    }
  },
  validations: {
    form: {
      name: { required },
      comment: { required }
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.auth.token !== null
    },
    bookId () {
      return Number(this.$route.params.id)
    },
    book () {
      return this.bookList.find(b => b.id === this.bookId)
    },
    bookList () {
      return this.$store.state.book.list
    },
    commentList () {
      return this.$store.state.comment.list.filter(c => c.book_id === String(this.bookId))
    },
    authorList () {
      const rawList = this.$store.state.author.list
      const hashList = {}
      for (let a of rawList) {
        hashList[a.id] = a
      }
      return hashList
    }
  },
  methods: {
    async createComment () {
      this.loading = true
      const payload = {
        book_id: this.bookId,
        name: this.form.name,
        comment: this.form.comment
      }
      await this.$store.dispatch('comment/create', { payload })
      this.loading = false
      this.$q.notify({
        message: 'New Comment created successfully!',
        icon: 'done',
        position: 'top',
        classes: 'app-message-positive',
        timeout: 2000
      })
      this.form.name = ''
      this.form.comment = ''
      this.$v.$reset()
    },
    async deleteComment (id) {
      this.$set(this.deleteLoading, id, true)
      await this.$store.dispatch('comment/destroy', { id })
      this.$set(this.deleteLoading, id, false)
      this.$q.notify({
        message: 'Comment deleted successfully!',
        icon: 'done',
        position: 'top',
        classes: 'app-message-positive',
        timeout: 2000
      })
    },
    async submit () {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.createComment()
    }
  },
  mounted () {
    this.$store.dispatch('author/fetch')
    this.$store.dispatch('book/fetch')
    this.$store.dispatch('comment/fetch')
  }
}
</script>
