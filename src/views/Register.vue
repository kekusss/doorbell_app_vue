<template>

  <div class="login-page vh-90">
    <b-container class="container py-5 h-100">
      <b-row class="d-flex justify-content-center align-items-center h-100">
        <b-card bg-variant="light"  class="mt-5 col-md-6">

          <font-awesome-icon size="9x" class="my-3" icon="user-circle"/>
          <h3 class="mt-3">WELCOME</h3>
          <p>Register by entering the information below</p>
          <b-card-body>
            <b-form @submit.prevent="register">
              <b-form-group>
                <b-input-group  class="mb-2">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <font-awesome-icon icon="at"/>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                      type="text"
                      v-model="user.email"
                      v-validate="'required|email'"
                      data-vv-as="'email'"
                      name="email"
                      placeholder="Your email"
                      id="email"
                  ></b-form-input>
                </b-input-group>
                <b-alert
                    :show="errors.has('email')"
                    variant="danger"
                >{{ errors.first('email') }}
                </b-alert>
              </b-form-group>

              <b-form-group>
                <b-input-group  class="mb-2">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <font-awesome-icon icon="key"/>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input
                      v-model="user.password"
                      v-validate="'required'"
                      data-vv-as="'password'"
                      name="password"
                      type="password"
                      placeholder="Password"
                  ></b-form-input>
                </b-input-group>
                <b-alert
                    :show="errors.has('password')"
                    variant="danger"
                >{{ errors.first('password') }}
                </b-alert>
              </b-form-group>

              <b-form-group class="mt-4">
                <b-button block type="sumbit" variant="info">
                  <span>Sign In</span>
                </b-button>
              </b-form-group>

              <b-form-group>
                <b-alert
                    :show="message.length > 0"
                    variant="danger"
                >{{ message }}
                </b-alert>
              </b-form-group>
            </b-form>
          </b-card-body>
        </b-card>
      </b-row>
    </b-container>
  </div>

</template>

<style>
.vh-90{
  height: 90vh;
}
</style>

<script>
import AuthService from '../services/auth.service';

export default {
  data() {
    return {
      user: {email: null, password: null},
      message: '',
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
              this.message = status;
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
