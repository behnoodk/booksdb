<template>
  <q-page class="q-pa-lg">
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-lg">
          <div class="col-auto">
            <q-input
              v-model="searchText"
              label="Title Search"
              style="min-width:400px"
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div
            class="col-auto"
            style="min-width:300px"
          >
            <q-select
              label="Author Search"
              v-model="authorFilter"
              :options="authorFilterOptions"
              option-value="id"
              option-label="name"
              emit-value
              map-options
            />
          </div>
        </div>

      </q-card-section>
    </q-card>
    <q-card
      class="q-my-lg book-list"
      v-for="b in filteredBookList"
      :key="b.id"
    >
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div
            class="col-auto"
            style="width:160px"
          >
            <q-img
              v-if="b.cover"
              :src="b.cover"
              spinner-color="white"
              transition="slide-right"
              style="max-width:150px"
            />
          </div>
          <div class="col">
            <router-link :to="{name: 'bookdetail', params: {id:b.id}}">
              <div style="font-size: 26px;font-weight:300">{{b.title}}</div>
            </router-link>
            <div
              class="q-pt-md"
              style="font-size: 16px"
              v-if="Object.keys(authorList).length > 0"
            >Author: {{authorList[b.author_id].name}}</div>
            <div
              class="q-pt-md"
              style="font-size: 16px"
            >Publication Year: {{b.year}}</div>
            <div
              class="q-pt-md"
              style="font-size: 16px"
            >ISBN: {{b.isbn}}</div>
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
              :to="{name: 'bookedit', params: {id: b.id}}"
            >
              <q-tooltip>Edit Book's Info</q-tooltip>
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
      searchText: '',
      authorFilter: -1
    }
  },
  computed: {
    bookList () {
      return this.$store.state.book.list
    },
    filteredBookList () {
      let list = this.bookList
      const s = this.searchText
      const a = String(this.authorFilter)
      if (s) {
        list = list.filter(b => b.title.toLowerCase().indexOf(s.toLowerCase()) > -1)
      }
      if (a !== '-1') {
        list = list.filter(b => b.author_id === a)
      }

      return list
    },
    authorList () {
      const rawList = this.$store.state.author.list
      const hashList = {}
      for (let a of rawList) {
        hashList[a.id] = a
      }
      return hashList
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
  mounted () {
    this.$store.dispatch('book/fetch')
    this.$store.dispatch('author/fetch')
  }

}
</script>
