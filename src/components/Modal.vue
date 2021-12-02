<template name="modal">
<div class="modal-mask">
  <div class="modal-wrapper">
    <div class="modal-container">
      <img :src="image" class="picture"/>
      <div class="modal-footer">
        <slot name="footer">
          <b-button size="md" @click="$emit('close')" class="btn-danger">
            CLOSE
          </b-button>
        </slot>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import DbService from "../services/db.service";
import ApiService from "../services/api.service"
import AuthService from "@/services/auth.service";

export default {
  name: 'Modal',
  props: {
    file: String
  },
  data() {
    return {
      serverAddress: null,
      token: null,
      image: null
    };
  },
  created() {
    const email = AuthService.getCurrentUser().email;
    DbService.getDeviceData(email).then((data) => {
      const token = data.secure_key;
      let address = data.api_address
      if (!address.includes("http", 0)) {
        address = "https://" + data.api_address;
      }
      console.log(address, token)

      this.serverAddress = address;
      this.token = token;

      this.getImage();
    });
  },
  methods: {
    getImage(){
      const api = ApiService.getInstance(this.serverAddress, this.token);

      api.get('index.php/api/photo/' + this.file)
          .then(response => {
            this.image = response.data;
          })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: fit-content;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

img.picture{
  max-width: 100%;
}

</style>
