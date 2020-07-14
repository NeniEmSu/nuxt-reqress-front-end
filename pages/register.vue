<template>
  <div>
    <h1 class="text-center">
      Register
    </h1>
    <hr />
    <b-alert v-if="error" show variant="danger">
      <h4 class="alert-heading">
        Error
      </h4>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="error"></div>
    </b-alert>
    <b-alert v-if="$auth.$state.redirect" show>
      You have to be login before accessing to
      <strong>{{ $auth.$state.redirect }}</strong>
    </b-alert>
    <b-row align-h="center" class="pt-4">
      <b-col lg="4" md="6">
        <b-card bg-variant="light">
          <form @keydown.enter="signUp">
            <b-form-group label="Username">
              <b-input
                ref="userName"
                v-model="userName"
                placeholder="Username"
                required
                name="userName"
              />
            </b-form-group>

            <b-form-group
              label="Email"
              description="We'll never share your email with anyone else."
            >
              <b-input
                ref="email"
                v-model="email"
                placeholder="Email address"
                required
                name="email"
              />
            </b-form-group>

            <b-form-group label="Password">
              <b-input-group>
                <b-input-group-prepend is-text class="clickable">
                  <b-icon
                    :icon="passwordIcon"
                    font-scale="1.5"
                    @click="hidePassword = !hidePassword"
                  >
                  </b-icon>
                </b-input-group-prepend>
                <b-input
                  v-model="password"
                  :type="passwordType"
                  placeholder="password"
                  required
                  name="password"
                />
              </b-input-group>
            </b-form-group>

            <b-form-group label="Confirm password">
              <b-input-group>
                <b-input-group-prepend is-text class="clickable">
                  <b-icon
                    :icon="passwordIcon"
                    font-scale="1.5"
                    @click="hidePassword = !hidePassword"
                  >
                  </b-icon>
                </b-input-group-prepend>
                <b-input
                  v-model="repeat_password"
                  :type="passwordType"
                  placeholder="Confirm password"
                  required
                  name="repeat_password"
                />
              </b-input-group>
            </b-form-group>

            <div class="text-center">
              <b-btn variant="primary" block @click="signUp">
                Sign Up
              </b-btn>
            </div>
            <div class="text-center" style="margin-top: 20px;">
              Already got an account? <nuxt-link to="/login">Login</nuxt-link>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  name: 'Register',
  auth: 'guest',

  data() {
    return {
      userName: '',
      email: '',
      password: '',
      repeat_password: '',
      error: null,
      hidePassword: true,
    }
  },

  computed: {
    passwordType() {
      return this.hidePassword ? 'password' : 'text'
    },
    passwordIcon() {
      return this.hidePassword ? 'eye-fill' : 'eye-slash-fill'
    },
  },

  methods: {
    async signUp() {
      try {
        await this.$axios
          .post(`${process.env.BACKEND_ENDPOINT}/api/register`, {
            userName: this.userName,
            email: this.email,
            password: this.password,
            repeat_password: this.repeat_password,
          })
          .then((response) => {
            this.$swal('Success', `User Registerd successfully`, 'success')
          })

        await this.$auth
          .loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          })
          .then((response) => {
            // this.$swal('Success', `${this.$auth.user.email}`, 'success')
          })
      } catch (error) {
        this.error = error
        this.$swal('error', `${error.meesage}`, 'error')
      }
    },
  },
}
</script>

<style lang="scss">
.clickable {
  cursor: pointer;
}
</style>
