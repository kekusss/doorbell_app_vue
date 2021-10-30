<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-show="isLoggedIn" to="/dashboard">Dashboard</router-link> |
      <router-link v-show="!isLoggedIn" to="/login">Login</router-link> |
      <router-link v-show="!isLoggedIn" to="/register">Register</router-link> |
      <a v-show="isLoggedIn" href="#" @click="logOut">LogOut</a>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>


export default {
  name: 'App',
  computed: {
    isLoggedIn() {
      return this.$store.state.status.loggedIn;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('logout').then(
          () => {
            this.$router.push('/');
          },
      );
    },
  }

};
</script>