<template>
  <q-page class="q-pa-lg">
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-lg">
          <div class="col-auto">
            <q-input
              v-model="searchText"
              label="Author Search"
              style="min-width:400px"
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card
      class="q-my-lg"
      v-for="a in filteredAuthorList"
      :key="a.id"
    >
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col">
            <div style="font-size: 26px;font-weight:300">{{a.name}}</div>
            <div
              class="q-pt-md"
              style="font-size: 16px"
            >Books: {{bookCount(a.id)}}</div>
          </div>
          <div
            class="col-auto"
            v-if="isLoggedIn"
          >
            <q-btn
              flat
              round
              icon="edit"
              color="accent"
              :to="{name: 'authoredit', params: {id: a.id}}"
            >
              <q-tooltip>Edit Author's Name</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      searchText: ''
    }
  },
  computed: {
    bookList () {
      return this.$store.state.book.list
    },
    filteredAuthorList () {
      let list = this.authorList
      const s = this.searchText
      if (s) {
        list = list.filter(b => b.name.toLowerCase().indexOf(s.toLowerCase()) > -1)
      }
      return list
    },
    authorList () {
      return this.$store.state.author.list
    },
    authorFilterOptions () {
      const list = [{
        id: -1,
        name: 'All Authors'
      }]
      return list.concat(this.$store.state.author.list)
    },
    isLoggedIn () {
      return this.$store.state.auth.token !== null
    }
  },
  methods: {
    bookCount (authorId) {
      return this.bookList.filter(b => b.author_id === String(authorId)).length
    }
  },
  mounted () {
    this.$store.dispatch('book/fetch')
    this.$store.dispatch('author/fetch')
  }

}
</script>
