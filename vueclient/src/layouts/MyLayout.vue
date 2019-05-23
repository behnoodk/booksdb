<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Books Database
        </q-toolbar-title>

        <q-btn
          v-if="!isLoggedIn"
          flat
          label="Login"
          :to="{name: 'login'}"
        />
        <q-btn
          v-if="!isLoggedIn"
          flat
          label="Register"
          :to="{name: 'register'}"
        />
        <div v-if="isLoggedIn">
          {{userName}}
        </div>
        <q-btn
          v-if="isLoggedIn"
          flat
          @click="logout"
          icon="exit_to_app"
        >
          <q-tooltip>Logout</q-tooltip>
        </q-btn>
      </q-toolbar>
      <q-tabs>
        <q-route-tab
          label="Books"
          :to="{name: 'index'}"
        />
        <q-route-tab
          label="Authors"
          :to="{name: 'authors'}"
        />
      </q-tabs>
    </q-header>
    <q-page-container class="bg-grey-2">
      <router-view />
      <q-page-sticky
        v-if="isLoggedIn"
        position="bottom-right"
        :offset="[18, 18]"
      >
        <q-fab
          icon="add"
          direction="up"
          color="accent"
        >
          <q-fab-action
            :to="{name:'authornew'}"
            color="primary"
            icon="person_add"
          />
          <q-fab-action
            :to="{name:'booknew'}"
            color="primary"
            icon="library_add"
          />
        </q-fab>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.auth.token !== null
    },
    userName () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    openURL,
    logout () {
      this.$store.commit('auth/setUser', null)
      this.$store.commit('auth/setToken', null)
      this.$router.push({ name: 'index' })
    }
  },
  mounted () {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    this.$store.commit('auth/setUser', user)
    this.$store.commit('auth/setToken', token)
  }
}
</script>

<style>
</style>
