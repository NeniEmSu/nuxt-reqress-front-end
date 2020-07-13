<template>
  <div class="mb-4">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="card-title mb-4 d-flex">
              <h3 v-if="adding">Add User</h3>
              <h3 v-else>Edit User</h3>
              <b-button
                class="ml-auto d-none d-sm-block"
                variant="light"
                @click="closeForm()"
              >
                <b-icon
                  icon="x-circle-fill"
                  color="danger"
                  variant="danger"
                  font-scale="1.5"
                >
                </b-icon>
              </b-button>
            </div>
            <form class="row" @submit.prevent="mutateUser">
              <b-form-group
                label="First Name:*"
                label-for="first_name"
                class="col-sm-6"
              >
                <b-form-input
                  id="first_name"
                  v-model="$v.userDetails.first_name.$model"
                  type="text"
                  required
                  placeholder="Enter your first name"
                  :class="[
                    !$v.userDetails.first_name.$error &&
                    $v.userDetails.first_name.$model &&
                    $v.userDetails.first_name.minLength
                      ? 'is-valid'
                      : '',
                    $v.userDetails.first_name.$error &&
                    !$v.userDetails.first_name.minLength
                      ? 'is-invalid'
                      : '',
                  ]"
                  :state="
                    $v.userDetails.first_name.$dirty
                      ? !$v.userDetails.first_name.$error
                      : null
                  "
                ></b-form-input>
                <small
                  v-if="
                    !$v.userDetails.first_name.required &&
                    $v.userDetails.first_name.$dirty
                  "
                  class="text-danger"
                  >First Name is required.</small
                >
                <small
                  v-if="!$v.userDetails.first_name.minLength"
                  class="text-danger"
                  >first_name must have at least
                  {{ $v.userDetails.first_name.$params.minLength.min }}
                  letters.</small
                >
              </b-form-group>

              <b-form-group
                label="Last Name:*"
                label-for="last_name"
                class="col-sm-6"
              >
                <b-form-input
                  id="last_name"
                  v-model="$v.userDetails.last_name.$model"
                  type="text"
                  required
                  placeholder="Enter your first name"
                  :class="[
                    !$v.userDetails.last_name.$error &&
                    $v.userDetails.last_name.$model &&
                    $v.userDetails.last_name.minLength
                      ? 'is-valid'
                      : '',
                    $v.userDetails.last_name.$error &&
                    !$v.userDetails.last_name.minLength
                      ? 'is-invalid'
                      : '',
                  ]"
                  :state="
                    $v.userDetails.last_name.$dirty
                      ? !$v.userDetails.last_name.$error
                      : null
                  "
                ></b-form-input>
                <small
                  v-if="
                    !$v.userDetails.last_name.required &&
                    $v.userDetails.last_name.$dirty
                  "
                  class="text-danger"
                  >First Name is required.</small
                >
                <small
                  v-if="!$v.userDetails.last_name.minLength"
                  class="text-danger"
                  >last_name must have at least
                  {{ $v.userDetails.last_name.$params.minLength.min }}
                  letters.</small
                >
              </b-form-group>

              <b-form-group label="Email:*" label-for="email" class="col-sm-6">
                <!-- v-model="userDetails.email" -->
                <b-form-input
                  id="email"
                  v-model="$v.userDetails.email.$model"
                  type="text"
                  required
                  placeholder="Enter your email"
                  :class="[
                    !$v.userDetails.email.$error &&
                    $v.userDetails.email.$model &&
                    $v.userDetails.email.minLength &&
                    $v.userDetails.email.email
                      ? 'is-valid'
                      : '',
                    $v.userDetails.email.$error &&
                    !$v.userDetails.email.$model &&
                    !$v.userDetails.email.minLength &&
                    !$v.userDetails.email.email
                      ? 'is-invalid'
                      : '',
                  ]"
                  :state="
                    $v.userDetails.email.$dirty
                      ? !$v.userDetails.email.$error
                      : null
                  "
                ></b-form-input>
                <small
                  v-if="
                    !$v.userDetails.email.required &&
                    $v.userDetails.email.$dirty
                  "
                  class="text-danger"
                  >Email is required.</small
                >
                <small
                  v-if="!$v.userDetails.email.minLength"
                  class="text-danger"
                  >Email must have at least
                  {{ $v.userDetails.email.$params.minLength.min }}
                  letters.</small
                >
                <small v-if="!$v.userDetails.email.email" class="text-danger"
                  >Email is invalid!</small
                >
              </b-form-group>

              <b-form-group label="avatar:" label-for="avatar" class="col-sm-6">
                <b-form-input
                  id="avatar"
                  v-model="$v.userDetails.avatar.$model"
                  type="text"
                  placeholder="Enter your avatar address"
                  :class="[
                    !$v.userDetails.avatar.$error &&
                    $v.userDetails.avatar.url &&
                    $v.userDetails.avatar.$model
                      ? 'is-valid'
                      : '',
                    $v.userDetails.avatar.$error &&
                    !$v.userDetails.avatar.url &&
                    !$v.userDetails.avatar.$model
                      ? 'is-invalid'
                      : '',
                  ]"
                  :state="
                    $v.userDetails.avatar.$dirty
                      ? !$v.userDetails.avatar.$error
                      : null
                  "
                ></b-form-input>
                <small v-if="!$v.userDetails.avatar.url" class="text-danger"
                  >avatar url is invalid!</small
                >
              </b-form-group>

              <b-form-group class="col-sm-6">
                <span
                  v-if="addLoading"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <button v-else class="btn btn-primary" :disabled="isDisabled">
                  Submit
                </button>
              </b-form-group>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email, url } from 'vuelidate/lib/validators'
export default {
  props: {
    adding: {
      default: false,
      type: Boolean,
    },
    userDetails: {
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        first_name: null,
        last_name: null,
        email: null,
        avatar: null,
      },
      type: Object,
    },
  },
  data() {
    return {
      isValid: false,
      addLoading: false,
      errors: [],
    }
  },

  validations: {
    userDetails: {
      first_name: {
        required,
        minLength: minLength(4),
      },

      last_name: {
        required,
        minLength: minLength(4),
      },

      email: {
        required,
        email,
        minLength: minLength(7),
      },

      avatar: {
        url,
      },
    },
  },

  computed: {
    isDisabled() {
      if (
        this.userDetails.first_name === null ||
        this.userDetails.last_name === null ||
        this.userDetails.email === null ||
        this.$v.userDetails.first_name.$error ||
        this.$v.userDetails.last_name.$error ||
        this.$v.userDetails.email.$error
      ) {
        return !this.isValid
      }
      return this.isValid
    },
  },

  methods: {
    closeForm() {
      this.$emit('Close-Form')
    },

    mutateUser() {
      if (this.adding) return this.addNewUser()
      return this.editUser()
    },

    async addNewUser() {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
      try {
        this.addLoading = true
        await this.$axios
          .$post(`${process.env.BACKEND_ENDPOINT}`, this.userDetails, config)
          .then((response) => {
            this.$emit('Reset-State')
            this.$emit('Call-Get-Fuction')
            this.$swal(
              'Success',
              `New User: ${response.username}, with email address: ${response.email} was added successfully`,
              'success'
            )
          })
      } catch (error) {
        this.$swal('Error', `Something Went wrong, \n Error: ${error}`, 'error')
      }
      this.addLoading = false
    },

    async editUser() {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
      try {
        this.addLoading = true
        await this.$axios
          .$post(
            `${process.env.BACKEND_ENDPOINT}/${this.userDetails.id}`,
            this.userDetails,
            config
          )
          .then((response) => {
            this.$store.dispatch('toast/setToast', {
              name: 'Success',
              variant: 'success',
              text: `${response.username} updated sucessfully.`,
              delay: 5000,
            })
            this.$emit('Call-Get-Fuction')
            this.$swal(
              'Success',
              `${response.username} updated Successfully`,
              'success'
            )
          })
      } catch (error) {
        this.$swal('Error', `Something Went wrong, \n Error: ${error}`, 'error')
      }
      this.addLoading = false
    },
  },
}
</script>
