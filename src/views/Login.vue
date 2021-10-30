<template>
  <div class="container-login">
    <div class="left-login">
      <div class="header-login">
        <h1>Sign in to yukChat!</h1>
      </div>
      <div class="form-login">
        <div class="form-email">
          <input id="email" type="text" v-model="user.email" placeholder="Your email">
        </div>
        <div class="form-password">
          <input id="password" type="password" v-model="user.password" placeholder="Your password">
        </div>
      </div>
      <div class="button-register">
        <p>Forgot Password</p>
      </div>
      <div class="button-login">
        <button @click="handleLogin">SIGN IN</button>
      </div>
    </div>
    <div class="right-login">
      <div class="header-right">
        <h1>Hello, Friend!</h1>
      </div>
      <div class="body-right">
        <p>Enter your personal details <br>
          and start journey with us
        </p>
      </div>
      <div class="button-register">
        <button><router-link class="router-link"
                             to="/register">SIGN UP</router-link></button>
      </div>
    </div>
  </div>
</template>

<script>

import DbService from "../services/db.service";

export default {
  name: 'Login',
  data() {
    return {
      user: {email: null, password: null},
      message: '',
    };
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('login', {email: this.user.email, password: this.user.password}).then(
          (user) => {
            DbService.writeUserData(user.email, user.uid, 'token').then(() => {
              console.log("Created user data successfully!");
              this.$router.push('/dashboard');
            })
            .catch(e => {
              console.log(e);
              alert('Something went wrong - check console');
            });
          },
          (error) => {
            this.message = error;
            alert(this.message);
          }
      );
    }
  }
};
</script>

<style>
.alert {
  margin-top: 0.25rem;
  padding: 0.25rem 0.25rem;
}
</style>
