<template>
  <div id="app">
    <div class="navbar-wrapper">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand to="/">
          <img src="./assets/logo.png" alt="Doorbell" />
          Doorbell app
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/about">About</b-nav-item>
            <b-nav-item v-show="isLoggedIn" to="/dashboard">Dashboard</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-show="!isLoggedIn" to="/login" class="mr-4">
              <font-awesome-icon icon="sign-in-alt"/>
              Login
            </b-nav-item>
            <b-nav-item v-show="!isLoggedIn" to="/register" class="mr-4">
              <font-awesome-icon icon="user-plus"/>
              Register
            </b-nav-item>

            <b-nav-item-dropdown v-show="isLoggedIn" right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <font-awesome-icon icon="user"/>
                <em class="ml-3 mr-2">User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item v-show="isLoggedIn" href="#" @click="logOut">
                <font-awesome-icon icon="sign-out-alt"/>
                Sign Out
              </b-dropdown-item>
            </b-nav-item-dropdown>

          </b-navbar-nav>

        </b-collapse>

      </b-navbar>
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

  .navbar-wrapper{
    .navbar{
      .navbar-brand{
        img{
          max-width: 40px;
        }
      }


      a {
        color: #FFF;

        &.router-link-exact-active {
          font-weight: bold;
        }
      }

      .b-nav-dropdown.dropdown{
        ul{
          li{
            a{
              color: #2c3e50;
            }
          }
        }
      }
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
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpgradeUI = true;
      });
    }
  },
  methods: {
    logOut() {
      // @todo remove key from db
      this.$store.dispatch('logout').then(
          () => {
            this.$router.push('/');
          },
      );
    },
    async accept() {
      this.showUpgradeUI = false
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    }
  }

};
</script>