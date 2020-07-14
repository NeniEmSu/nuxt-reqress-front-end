<template>
  <div class="mt-5">
    <h1 class="text-center">
      Login
    </h1>
    <hr />
    <b-alert v-if="error" show variant="danger">
      <h4 class="alert-heading">
        Error!
      </h4>
      {{ error.response.data.message || error.response.data.error.message }}
    </b-alert>
    <b-alert v-if="$auth.$state.redirect" show dismissible>
      You have to login before accessing to
      <strong>{{ $auth.$state.redirect }}</strong>
    </b-alert>
    <b-row align-h="center" class="pt-4">
      <b-col lg="4" md="6">
        <b-card bg-variant="light">
          <form>
            <b-form-group label="Email">
              <b-form-input
                id="email"
                v-model.trim="$v.email.$model"
                placeholder="Email address"
                required
                name="email"
                :class="[
                  !$v.email.$error &&
                  $v.email.$model &&
                  $v.email.minLength &&
                  $v.email.email
                    ? 'is-valid'
                    : '',
                  $v.email.$error &&
                  !$v.email.$model &&
                  !$v.email.minLength &&
                  !$v.email.email
                    ? 'is-invalid'
                    : '',
                ]"
                :state="$v.email.$dirty ? !$v.email.$error : null"
              />
              <small
                v-if="!$v.email.required && $v.email.$dirty"
                class="text-danger"
                >Email is required.</small
              >
              <small v-if="!$v.email.minLength" class="text-danger"
                >Email must have at least
                {{ $v.email.$params.minLength.min }}
                letters.</small
              >
              <small v-if="!$v.email.email" class="text-danger">
                Email is invalid!
              </small>
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
                  id="password"
                  v-model.trim="$v.password.$model"
                  :type="passwordType"
                  placeholder="password"
                  required
                  name="password"
                  :class="[
                    !$v.password.$error &&
                    $v.password.$model &&
                    $v.password.minLength &&
                    $v.password.maxLength
                      ? 'is-valid'
                      : '',
                    $v.password.$error &&
                    !$v.password.$model &&
                    !$v.password.minLength &&
                    !$v.password.maxLength
                      ? 'is-invalid'
                      : '',
                  ]"
                  :state="$v.password.$dirty ? !$v.password.$error : null"
                />
              </b-input-group>
              <small
                v-if="!$v.password.required && $v.password.$dirty"
                class="text-danger"
                >Password is Required.</small
              >
              <small v-if="!$v.password.minLength" class="text-danger">
                Password must have at least
                {{ $v.password.$params.minLength.min }}
                letters.
              </small>

              <small v-if="!$v.password.maxLength" class="text-danger">
                Password can't be more than
                {{ $v.password.$params.maxLength.max }}
                letters.
              </small>
            </b-form-group>

            <div class="text-center">
              <b-btn
                variant="primary"
                :disabled="isDisabled"
                block
                @click="login"
              >
                Login
              </b-btn>
            </div>
            <div class="text-center" style="margin-top: 20px;">
              Don't yet have an account?
              <nuxt-link to="/register">Register</nuxt-link>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.login-button {
  border: 0;
}
</style>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
export default {
  layout: 'admin',
  name: 'Login',
  middleware: ['auth'],

  data() {
    return {
      email: null,
      password: null,
      error: null,
      hidePassword: true,
    }
  },

  validations: {
    email: {
      required,
      email,
      minLength: minLength(7),
    },

    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(20),
    },
  },

  computed: {
    passwordType() {
      return this.hidePassword ? 'password' : 'text'
    },
    passwordIcon() {
      return this.hidePassword ? 'eye-fill' : 'eye-slash-fill'
    },
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    isCallback() {
      return Boolean(this.$route.query.callback)
    },
    isDisabled() {
      if (
        this.password === null ||
        this.email === null ||
        this.$v.password.$error ||
        this.$v.email.$error
      ) {
        return !this.isValid
      }
      return this.isValid
    },
  },
  methods: {
    login() {
      this.error = null
      return this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then((response) => {
          this.$swal('Success', `User logedin successfully`, 'success')
        })
        .catch((error) => {
          this.error = error
          this.$swal('error', `${error.meesage}`, 'error')
        })
    },
  },
}
</script>

<style lang="scss">
.clickable {
  cursor: pointer;
}
</style>
