<template>
  <b-navbar toggleable="sm" type="dark" variant="dark">
    <b-container>
      <b-navbar-brand to="/">
        <b>REQ | RES</b>
        +
        <b-img
          width="26px"
          fluid
          class="img-thumbnail"
          src="https://nuxtjs.org/logos/nuxt-icon.png"
        ></b-img>

        Frontend</b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/users">Users</b-nav-item>
          <b-nav-item to="/register">Register</b-nav-item>
          <template v-if="$auth.loggedIn">
            <b-nav-item-dropdown
              class="text-capitalize"
              :text="$auth.user.userName"
              right
            >
              <b-dropdown-item @click="$auth.logout()">
                Logout
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
          <template v-else>
            <b-nav-item to="/login">
              Login
            </b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {}
</script>

<style scoped>
.nuxt-link-exact-active {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
