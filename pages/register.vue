<template>
  <div class="mt-5">
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
              <b-form-input
                id="userName"
                v-model.trim="$v.userName.$model"
                :class="[
                  !$v.userName.$error &&
                  $v.userName.$model &&
                  $v.userName.minLength
                    ? 'is-valid'
                    : '',
                  $v.userName.$error &&
                  !$v.userName.$model &&
                  !$v.userName.minLength
                    ? 'is-invalid'
                    : '',
                ]"
                :state="$v.userName.$dirty ? !$v.userName.$error : null"
                placeholder="Username"
                required
                type="text"
                name="userName"
              ></b-form-input>
              <small
                v-if="!$v.userName.required && $v.userName.$dirty"
                class="text-danger"
                >User name is required.</small
              >
              <small v-if="!$v.userName.minLength" class="text-danger"
                >User name must have at least
                {{ $v.userName.$params.minLength.min }}
                letters.</small
              >
            </b-form-group>

            <b-form-group
              label="Email"
              :description="
                !$v.email.$error
                  ? `We'll never share your email with anyone else.`
                  : ''
              "
            >
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
                <b-form-input
                  id="confirm_password"
                  v-model.trim="$v.confirm_password.$model"
                  :type="passwordType"
                  placeholder="Confirm password"
                  required
                  name="confirm_password"
                  :class="[
                    !$v.confirm_password.$error &&
                    $v.confirm_password.$model &&
                    $v.confirm_password.sameAsPassword
                      ? 'is-valid'
                      : '',
                    $v.confirm_password.$error &&
                    !$v.confirm_password.$model &&
                    !$v.confirm_password.sameAsPassword
                      ? 'is-invalid'
                      : '',
                  ]"
                  :state="
                    $v.confirm_password.$dirty
                      ? !$v.confirm_password.$error
                      : null
                  "
                /> </b-input-group
              ><small
                v-if="
                  !$v.confirm_password.required && $v.confirm_password.$dirty
                "
                class="text-danger"
                >Required.</small
              >
              <small
                v-if="!$v.confirm_password.sameAsPassword"
                class="text-danger"
                >Does not match Password</small
              >
            </b-form-group>

            <div class="text-center">
              <b-btn
                variant="primary"
                block
                :disabled="isDisabled"
                @click="signUp"
              >
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
import {
  required,
  minLength,
  maxLength,
  sameAs,
  email,
} from 'vuelidate/lib/validators'
export default {
  layout: 'admin',
  name: 'Register',
  auth: 'guest',

  data() {
    return {
      userName: null,
      email: null,
      password: null,
      confirm_password: null,
      error: null,
      hidePassword: true,
    }
  },
  validations: {
    userName: {
      required,
      minLength: minLength(4),
    },

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

    confirm_password: { required, sameAsPassword: sameAs('password') },
  },

  computed: {
    passwordType() {
      return this.hidePassword ? 'password' : 'text'
    },
    passwordIcon() {
      return this.hidePassword ? 'eye-fill' : 'eye-slash-fill'
    },
    isDisabled() {
      if (
        this.userName === null ||
        this.password === null ||
        this.confirm_password === null ||
        this.email === null ||
        this.$v.userName.$error ||
        this.$v.password.$error ||
        this.$v.confirm_password.$error ||
        this.$v.email.$error
      ) {
        return !this.isValid
      }
      return this.isValid
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
            confirm_password: this.confirm_password,
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
