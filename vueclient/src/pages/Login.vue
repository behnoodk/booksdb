<template>
  <q-page class="login-page">
    <div class="row justify-center">
      <div class="col-auto">
        <br />
        <br />
        <br />
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-auto text-h6">
        Login to Books Database
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-6">
        <form @submit.prevent="submit">
          <q-card
            class="login-card bg-transparent"
            flat
          >
            <q-card-section>
              <q-input
                ref="email"
                v-model.trim="form.email"
                label="Email"
                :error="$v.form.email.$error"
                error-message="Please enter a valid email"
                autofocus
              >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
              <q-input
                ref="password"
                v-model="form.password"
                label="Password"
                :error="$v.form.password.$error"
                error-message="Please enter your password"
                type="password"
                class="q-mb-lg"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <transition enter-active-class="animated fadeIn">
                <div
                  v-if="invalidCreds === true"
                  class="note note--danger text-small"
                >
                  Invalid credentials!
                </div>
              </transition>
            </q-card-section>
            <q-card-actions>
              <q-btn
                color="primary"
                type="submit"
                class="full-width"
                :loading="loading"
                style="min-height:40px"
              >Login</q-btn>
            </q-card-actions>
          </q-card>
        </form>
      </div>
    </div>
  </q-page>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import http from '../api/http'
const isDev = process.env.NODE_ENV === 'development'
export default {
  data () {
    return {
      loading: false,
      invalidCreds: false,
      form: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  methods: {
    async submit () {
      this.invalidCreds = false
      this.$v.$touch()
      if (this.$v.$invalid) return

      this.loading = true

      let clientId = '3'
      let clientSecret = 'J1RaytPpPd421gXgf7DbUgJyOCeCsnIigLw7ui9q'
      if (!isDev) {
        clientId = '2'
        clientSecret = 'aNhMKFT9B2HGRZYUntCebvK9ZIlHIDwTQjpmAOrk'
      }

      const payload = {
        'grant_type': 'password',
        client_id: clientId,
        client_secret: clientSecret,
        'username': this.form.email,
        'password': this.form.password,
        'scope': '*'
      }

      const r = await http.post('/api/oauth/token', payload)
      if (r.status === 200) {
        const token = r.data.access_token
        http.defaults.headers.common['Authorization'] = 'Bearer ' + token
        const userInfo = await http.get('/api/api/user')
        this.$store.commit('auth/setUser', userInfo.data.name)
        this.$store.commit('auth/setToken', token)
        this.$q.notify({
          message: `Logged in as ${userInfo.data.name}`,
          icon: 'done',
          position: 'top',
          classes: 'app-message-positive',
          timeout: 2000
        })
        this.$router.push({ name: 'index' })
      } else {
        this.invalidCreds = true
      }
      this.loading = false
    }
  }
}
</script>
