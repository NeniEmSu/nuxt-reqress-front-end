<template>
  <section class="mt-5">
    <div class="container">
      <h1>
        Users
      </h1>

      <template v-if="loading">
        <content-placeholders class="mt-2">
          <content-placeholders-text class="my-2" :lines="10" />
        </content-placeholders>
      </template>

      <template v-else>
        <section class="mt-2">
          <UserForm
            v-if="addState"
            :adding="adding"
            :user-details="userDetails"
            @Call-Get-Fuction="callGetUsers"
            @Reset-State="resetFormState"
            @Close-Form="addState = false"
          />
          <div class="my-2">
            <div class="d-flex">
              <button class="btn btn-info my-3" @click="initForm">
                {{ addState ? 'Cancel' : 'Add User' }}
              </button>
            </div>

            <b-table
              striped
              hover
              responsive
              show-empty
              :busy.sync="loading"
              :items="items"
              :fields="fields"
              :current-page="currentPage"
              :per-page="0"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              sticky-header="600px"
            >
              <template v-slot:thead-top="">
                <b-tr>
                  <b-th colspan="1" variant="primary">Image</b-th>
                  <b-th colspan="3" variant="secondary">
                    User Data
                  </b-th>
                  <b-th colspan="3" variant="success">
                    Action
                  </b-th>
                </b-tr>
              </template>
              <template v-slot:cell(avatar)="data">
                <b-img-lazy
                  width="40"
                  :src="data.item.avatar"
                  :alt="data.item.first_name"
                ></b-img-lazy>
              </template>
              <template v-slot:cell(first_name)="data">
                <nuxt-link
                  :to="{
                    name: 'users-id',
                    params: { id: data.item.id },
                  }"
                  >{{ data.item.first_name }}</nuxt-link
                >
              </template>

              <template v-slot:cell(email)="data">
                <a :href="`mailto:${data.item.email}`">{{ data.item.email }}</a>
              </template>
              <template v-slot:cell(edit)="data">
                <b-button
                  class="ml-auto"
                  variant="light"
                  @click="editUser(data.item.id)"
                >
                  <b-icon
                    icon="pencil-square"
                    color="seconday"
                    variant="seconday"
                    font-scale="1.5"
                  ></b-icon>
                </b-button>
              </template>
              <template v-slot:cell(view)="data">
                <b-button
                  class="ml-auto"
                  variant="light"
                  :to="{
                    name: 'users-id',
                    params: { id: data.item.id },
                  }"
                >
                  <b-icon
                    icon="box-arrow-in-up-right"
                    color="primary"
                    variant="primary"
                    font-scale="1.5"
                  ></b-icon>
                </b-button>
              </template>
              <template v-slot:cell(delete)="data">
                <b-button
                  class="ml-auto"
                  variant="light"
                  @click="deleteUser(data.item.id)"
                >
                  <b-icon
                    icon="trash-fill"
                    color="danger"
                    variant="danger"
                    font-scale="1.5"
                  ></b-icon>
                </b-button>
              </template>
            </b-table>
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
            ></b-pagination>
          </div>
        </section>
      </template>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Users',
  data() {
    return {
      userDetails: {
        first_name: null,
        last_name: null,
        email: null,
        avatar: null,
      },
      addState: false,
      adding: true,
      pageNumber: 0,
      numberOfPages: 0,
      sortBy: 'total',
      sortDesc: false,
      perPage: 3,
      currentPage: 1,
      fields: [
        {
          key: 'avatar',
          stickyColumn: true,
          isRowHeader: true,
          sortable: false,
        },
        {
          key: 'first_name',
          stickyColumn: true,
          sortable: true,
        },
        {
          key: 'last_name',
          sortable: true,
        },
        {
          key: 'email',
          sortable: false,
        },
        {
          key: 'edit',
          sortable: false,
        },
        {
          key: 'view',
          sortable: false,
        },
        {
          key: 'delete',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    ...mapState('users', ['users', 'rows', 'loading', 'errors']),
    items() {
      return this.users.map((user, index) => {
        return {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar: user.avatar,
          edit: '',
          view: '',
          delete: '',
        }
      })
    },
  },
  watch: {
    currentPage: {
      handler(value) {
        this.getUsers(this.currentPage)
      },
    },
  },
  created() {
    if (this.$store.state.users.users.length < 1) {
      this.getUsers(this.currentPage)
    }
  },
  methods: {
    ...mapActions('users', ['getUsers', 'deleteSingleUser']),
    initForm() {
      this.addState = !this.addState
    },
    resetFormState() {
      this.userDetails = {
        first_name: null,
        last_name: null,
        email: null,
        avatar: null,
      }
      this.addState = false
    },
    deleteUser(id) {
      this.deleteSingleUser(id)
    },
  },
  head() {
    return {
      title: 'Users',
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
