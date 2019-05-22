<template>
  <q-page class="login-page">
    <div class="row justify-center">
      <div class="col-auto">
        <br />
        <br />
        <br />
        <img
          src="/statics/logo-icon.png"
          alt="HealthyLine"
          width="100"
        >
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
      <div class="col-auto text-h6">
        Login to Books Database
      </div>
    </div>
    <div class="row justify-center">
      <form

          @submit.prevent="login"
        >
          <q-card
            class="login-card bg-transparent"
            flat
          >
            <q-card-section>
              <q-input
                input-class="input-ltr"
                ref="username"
                v-model.trim="form.username"
                hint="Email"
                :error="$v.form.username.$error"
                error-message="Please enter a valid email"
                autofocus
              >
                <template v-slot:append>
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
                <template v-slot:append>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <transition enter-active-class="animated fadeIn">
                <div
                  v-if="loginStatus==='invalid_credentials'"
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
  </q-page>
</template>
<script>
export default {

}
</script>
