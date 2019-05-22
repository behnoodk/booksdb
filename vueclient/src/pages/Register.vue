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
        Register
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
                ref="name"
                v-model.trim="form.name"
                hint="Name"
                :error="$v.form.name.$error"
                error-message="Please enter your name"
                autofocus
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                ref="email"
                v-model.trim="form.email"
                hint="Email"
                :error="$v.form.email.$error"
                error-message="Please enter a valid email"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
              <q-input
                ref="password"
                v-model="form.password"
                hint="Password"
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
                  v-if="registerSuccess === true"
                  class="note note--danger text-small"
                >
                  Registration completed! You can login now!
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

export default {
  data () {
    return {
      loading: false,
      registerSuccess: false,
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      name: {
        required
      },
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
      this.registerSuccess = false
      this.$v.$touch()
      if (this.$v.$invalid) return

      this.loading = true

      const payload = {
        'name': this.form.name,
        'email': this.form.email,
        'password': this.form.password
      }

      const r = await http.post('/api/api/register', payload)
      this.loading = false
      if (r.status === 200) {
        this.registerSuccess = true
        // this.$store.commit('auth/setToken', r.data.access_token)
      } else {
        // this.invalidCreds = true
      }
    }
  }
}
</script>
