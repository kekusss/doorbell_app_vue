<template>
  <div class="login-page vh-90">
    <b-container>
      <b-row class="d-flex justify-content-center align-items-center my-5">
        <b-col md="8" class="d-flex justify-content-center align-items-center">
          <img class="camera"  :src="serverAddress + '/camera'">
        </b-col>
      </b-row>
      <b-row class="d-flex justify-content-center align-items-center">
        <b-col md="8">
          <b-button variant="success" md="2" class="col-md-4 my-2" @click="sendSignal('open')">
            Open door
          </b-button>
          <b-button variant="danger" class="col-md-4 my-2" @click="sendSignal('close')">
            Access denied
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style>
.vh-90{
  height: 90vh;
}

img.camera {
  max-width: 100%;
}
</style>

<script>

import DbService from "../services/db.service";
import ApiService from "../services/api.service";

  export default {
    name: 'Dashboard',
    data() {
      return {
        serverAddress: null,
        token: null,
      };
    },
    created() {
      const email = this.$store.state.user.email;
      DbService.getDeviceData(email).then((data) => {

        const token = data.secure_key;
        let address = data.api_address
        if (!address.includes("http", 0)) {
          address = "https://" + data.api_address;
        }

        this.serverAddress = address;
        this.token = token;
      })
    },
    methods: {
      sendSignal(action){
          const api = ApiService.getInstance(this.serverAddress, this.token);

          api.get('index.php/api/entrance/' + action)
            .then(response => {
              console.log(response);
              if (response.data) {
                alert('Wykonano pomyślnie: ' + action);
              }
              return response.data;
            })
      }
    }
  };
</script>