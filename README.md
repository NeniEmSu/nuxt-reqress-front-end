# Stamax test work

## Work requirements

1. Pour the project into an open repository and give a link to it
2. Expand the project on github pads or frebase (or on any other hosting)

## Stack

1. [x] Vue.js- use vue cli for deployment
    > NOte: I used nuxt js as it has improved file structures and handles seo and ssr as all proper web aps shold Have.
2. [x] UI / UX- at your discretion, you can use any UI-frameworks (vuetify, bootstrap, etc.)
3. [x] Vue Router
4. [x] Vuex
5. [x] Axios

> As the REST API of the server use [reqres.in](https://reqres.in), the service provides a fake api, it will be enough.  It is necessary to take into account, growth /put /delete requests, the service responds, but the data on the server will not change. All data is changed locally in the same session.

## Tasks

### Navigation

[x] Home and user page.  
[x] Home page - / - just a blank page.
[x] Users page- /users - we get a list of Users and display them on page.
[ ] User page- /users/:id - display single user.
[x] User page - /user/id
    - [x] we receive data from the  api, and we display them in the same card as on the page of all users,
    - [x] only without the "see" button.  
    - On this page,
        - [ ] deletion +
        - [ ] editing is also available, similar to the page of all

### Requirements

1. [x] Add pagination
2. [x] User card includes:
    - [x] Name
    - [x] email
    - [x] Buttons: Delete, Edit, View
3. [x] Button to add a new user
    [x] When you click delete, delete the user through api + locally delete the user.  
    [x] When you click on edit, we show the modal window for editing the user, we send the data through api + we update the user data locally.  
    [x] When you click on view, go to the user page.  When you click on add a new user, the modal window for adding (it is also editing) - we send data via api + we add the user locally.

## Modal window for adding / editing a user

1. [ ] Name - mandatory/required, minimum 3 characters, maximum 20 (validation optional)
2. [ ] Workplace - mandatory/required (validation optional)
3. [ ] Password mandatory/required, minimum 8 characters, maximum 20 (validation optional)
4. [ ] Password confirmation - mandatory, exact match with the password field. (validation at will)

## Bonus users (performed as desired)

1. [ ] In the navigation panel, display the data of the last user who passed.  
2. [x] Display the data loading loaders while the requests are in progress,
    concerns:
    - [x] receiving all users (here you can add the deley parameter delay=3 to the request, where 3 is the seconds of waiting for the request),
        - [x] adding / editing the user
        - [x] (the loader on the form),
        - [x] deleting.  
3. [x] Notifications of success / failure of the operation.  
4. [x] Validation of form data

## Todos****

- [ ] fix vuex error for mutating state outside mutations.
- [ ] more error handling

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
