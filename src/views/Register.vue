<template>
  <div class="container-login">
    <div class="left-login">
      <div class="header-right">
        <h1>Welcome Back!</h1>
      </div>
      <div class="body-right">
        <p>To keep connected with us, <br>
          please login with your personal info
        </p>
      </div>
      <div class="button-register">
        <button><router-link class="router-link"
                             to="/login">SIGN IN</router-link></button>
      </div>
    </div>
    <div class="right-login">
      <div class="header-login">
        <h1>Create Account</h1>
      </div>
      <div class="form-login">
        <div class="form-email">
          <input id="email" type="text" v-model="user.email" placeholder="Your email">
        </div>
        <div class="form-password">
          <input id="password" type="password" v-model="user.password" placeholder="Your password">
        </div>
      </div>
      <div class="button-login">
        <button @click="register">SIGN UP</button>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/auth.service';

export default {
  data() {
    return {
      user: {email: null, password: null},
    };
  },
  methods: {
    register() {
      AuthService.register(this.user.email, this.user.password).then(
          (status) => {
            if(status == true){
              this.$router.push('/login');
            }
            else {
              alert(status);
            }
          });
    }
  }
};
</script>

<style>
.alert {
  margin-top: 0.25rem;
  padding: 0.1rem 0.1rem;
}
</style>
