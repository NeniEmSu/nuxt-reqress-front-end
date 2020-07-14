<template>
  <div class="container mt-5">
    <nav class="mt-3">
      <b-button class="ml-auto" variant="light" @click="goBack()">
        <b-icon
          icon="arrow90deg-left"
          color="danger"
          variant="danger"
          font-scale="1.5"
        ></b-icon>
      </b-button>
    </nav>
    <template v-if="loading">
      <content-placeholders>
        <h1 class="d-flex">
          More About <content-placeholders-heading class="mb-3" />
        </h1>
        <div class="row">
          <div class="col-xs-12 col-sm-3 center">
            <content-placeholders-img class="mb-2" />

            <div class="space space-4"></div>

            <content-placeholders-text :lines="1" />

            <content-placeholders-text :lines="1" />
          </div>

          <div class="col-xs-12 col-sm-9"></div>
        </div>
        <content-placeholders-text />
      </content-placeholders>
    </template>
    <template v-else>
      <div class="row mt-2">
        <div class="col-sm-12">
          <b-alert v-if="error" show variant="danger">
            <h4 class="alert-heading">
              Error
            </h4>
            <p>{{ error }}</p>
          </b-alert>

          <UserForm
            v-if="editState"
            :user-details="userDetails"
            @Call-Get-Fuction="callGetUser"
            @Close-Form="editState = false"
          />
        </div>
      </div>
      <div class="d-block d-sm-flex align-items-center">
        <h1>More About {{ `${user.first_name} ${user.last_name}` }}</h1>
        <b-button class="ml-4" variant="light" @click="editState = !editState">
          <b-icon icon="pencil-square" font-scale="1.5"> </b-icon>
        </b-button>

        <b-button
          class="ml-auto"
          variant="light"
          :disabled="deleteLoading"
          @click="deleteUser(user.id)"
        >
          <span
            v-if="deleteLoading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <b-icon
            v-else
            icon="trash-fill"
            color="danger"
            variant="danger"
            font-scale="1.5"
          >
          </b-icon>
        </b-button>
      </div>
      <b-img-lazy
        :id="`${user.first_name} avatar`"
        width="200"
        fluid
        editable
        img-responsive
        :src="user.avatar"
        :alt="`${user.first_name}'s Avatar image`"
      ></b-img-lazy>
      <p>
        Email: <a :href="`mailto:${user.email}`">{{ user.email }}</a>
      </p>
      <h4>Company details:</h4>
      <b-list-group>
        <b-list-group-item>
          <b>Name:</b> {{ company.company }}
        </b-list-group-item>
        <b-list-group-item>
          <b>
            Url:
          </b>
          <a :href="company.url" target="_blank" rel="noopener noreferrer">
            {{ company.url }}
          </a>
        </b-list-group-item>
        <b-list-group-item
          ><b>Statement:</b> {{ company.text }}
        </b-list-group-item>
      </b-list-group>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userDetails: {
        first_name: null,
        last_name: null,
        email: null,
        avatar: null,
      },
      user: {},
      error: null,
      company: {},
      editState: false,
      loading: false,
      deleteLoading: false,
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    onHidden() {
      // Return focus to the button once hidden
      this.$refs.button.focus()
    },
    callGetUser() {
      this.getUser()
      this.editState = false
    },
    async getUser() {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
      this.loading = true
      try {
        const response = await this.$axios.$get(
          `${process.env.BACKEND_ENDPOINT}/${this.$route.params.id}?delay=3`,
          config
        )
        const data = response
        this.user = data.data
        this.userDetails = data.data
        this.company = data.ad
      } catch (error) {
        this.$swal('Error', error.message, 'error')
      } finally {
        this.loading = false
      }
    },
    deleteUser(id) {
      this.deleteLoading = true
      this.$swal({
        name: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      }).then((willDelete) => {
        if (willDelete.value) {
          this.$axios
            .$delete(`${process.env.BACKEND_ENDPOINT}/${id}`)
            .then((response) => {
              this.deleteLoading = false
              this.$router.push('/users')
              this.$swal({
                text: "Poof! You've sucessfully deleted that user!",
                icon: 'success',
              })
            })
            .catch((error) => {
              this.deleteLoading = false
              this.$swal({
                name: 'Somethimg went wrong!',
                text: error,
                icon: 'error',
              })
            })
        } else {
          this.deleteLoading = false
          this.$swal("That user's data is safe!")
        }
      })
    },
  },
  head() {
    return {
      title: `User ${this.$route.params.id}`,
      titleTemplate: '%s - Reqress Nuxt Frontend!',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'An interface that allows to: View a list of users, add a new user, navigate to edit an existing user, delete a user.',
        },
      ],
    }
  },
}
</script>
