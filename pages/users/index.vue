<template>
  <section class="mt-5">
    <div class="container">
      <h1>
        Users
      </h1>

      <template v-if="loading">
        <content-placeholders>
          <content-placeholders-text class="mt-5" :lines="10" />
        </content-placeholders>
      </template>

      <template v-else>
        <section class="mt-2 container">
          <!-- <UserForm
            v-if="addState"
            :adding="adding"
            :user-details="userDetails"
            @Call-Get-Fuction="callGetUsers"
            @Reset-State="resetFormState"
            @Close-Form="addState = false"
          /> -->
          <div class="my-2">
            <div class="d-flex">
              <!-- <button class="btn btn-info my-3" @click="initForm">
                {{ addState ? 'Cancel' : 'Add User' }}
              </button> -->
              <!-- <b-form-group class="col-sm ml-auto my-auto">
                <b-input-group>
                  <b-input-group-prepend is-text>
                    <b-icon icon="search" font-scale="1.5"> </b-icon>
                  </b-input-group-prepend>
                  <b-input
                    v-model="search"
                    type="text"
                    placeholder="Search by Username"
                    required
                    name="Search"
                  />
                </b-input-group>
              </b-form-group> -->
            </div>

            <b-table
              striped
              hover
              responsive
              :fields="fields"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              sticky-header="600px"
              :items="items"
            >
              <template v-slot:thead-top="">
                <b-tr>
                  <b-th colspan="1" variant="primary">Index</b-th>
                  <b-th colspan="4" variant="secondary">
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
                    icon="pencil"
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
                  :disabled="deleteLoading"
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
          </div>
        </section>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Users',
  data() {
    return {
      users: [],
      loading: false,
      pageNumber: 0,
      numberOfPages: 0,
      sortBy: 'Total',
      sortDesc: true,
      fields: [
        { key: 'No', stickyColumn: true, isRowHeader: true, sortable: true },
        {
          key: 'avatar',
          sortable: false,
        },
        {
          key: 'first_name',
          stickyColumn: true,
          sortable: false,
        },
        {
          key: 'last_name',
          sortable: false,
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
    items() {
      return this.users.map((user, index) => {
        return {
          No: index + 1,
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
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
      this.loading = true
      try {
        const response = await this.$axios.$get(
          `${process.env.BACKEND_ENDPOINT}`,
          config
        )
        const data = response
        this.users = data.data
        this.pageNumber = data.page
        this.numberOfPages = data.total_pages
      } catch (error) {
        this.$swal('Error', error.message, 'error')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
