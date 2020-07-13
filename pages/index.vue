<template>
  <div class="container mt-5">
    <div>
      <h1>
        Nuxt Reqress Frontend
      </h1>
      <p>
        Front-end to consume the reqress.in dommy Api, with an interface that
        allows to: View a list of users, add a new user, navigate to edit an
        existing user, delete a user.
      </p>
      <b-button class="btn btn-success" to="/users">Get Started!</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  head() {
    return {
      title: `Index`,
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
